import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
// import { CreateUserDto } from '../dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument, UserModel } from 'src/database/schema/user/User.schema';
import { Model } from 'mongoose';
import { hash, compare } from 'bcrypt';
import LoginDto from '../dto/Login.dto';
import { AuthUserType } from '../types/AuthUserType';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) {}

    async signUp(createUser: any){
        try {
            const { email, role } = createUser;
            const { accessToken, refreshToken } = await this.getTokens(email, role);
            const hashedRefreshToken = await this.getHashed(refreshToken);
            await this.userModel.create({
                ...createUser,
                refreshToken : hashedRefreshToken,
            })
            return { accessToken, refreshToken };
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }

    async logIn(loginDto: LoginDto){
        const { email, password } = loginDto;
        const user: User = await this.userModel.findOne({ email });
        if(!user) throw new BadRequestException('invalid credential');
        const isPwdMatched = await user.verifyPassword(password);
        if(!isPwdMatched) throw new BadRequestException('invalid credential');
        const tokens = await this.getTokens(email, user.role);
        const hashedPassword = await this.getHashed(tokens.refreshToken);
        await this.userModel.findOneAndUpdate({ _id: user._id },{ refreshToken: hashedPassword });
        return tokens;
    }
  
    async logOut(user: AuthUserType){
        const { email } = user;
        await this.userModel.findOneAndUpdate({email}, { refreshToken: null });
    }
  
    async refreshToken(user: AuthUserType){
        const { email, role, refreshToken } = user;
        const userData: User = await this.userModel.findOne({ email });
        if(!userData || !userData?.refreshToken) throw new BadRequestException('invalid refresh token');
        const isRefreshTokenMatched = await compare(refreshToken, userData.refreshToken);
        if(!isRefreshTokenMatched) throw new BadRequestException('invalid refresh token');
        const tokens = await this.getTokens(email, user.role);
        const hashedPassword = await this.getHashed(tokens.refreshToken);
        await this.userModel.findOneAndUpdate({ _id: userData._id },{ refreshToken: hashedPassword });
        return tokens;
    }

    async getTokens(email: string, role: string){
        const [ accessToken, refreshToken ] = await Promise.all([
            this.jwtService.signAsync(
                {
                    email,
                    role,
                },
                {
                    secret: "access-token",
                    expiresIn: 60 * 15
                }
            ),
            this.jwtService.signAsync(
                {
                    email,
                    role,
                },
                {
                    secret: "refresh-token",
                    expiresIn: 60 * 60 * 24 * 7
                }
            )
        ])
        return {
            accessToken,
            refreshToken
        }
    }

    getHashed(data: string){
        return hash(data, 10);
    }

}
