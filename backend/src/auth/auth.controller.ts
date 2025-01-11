import { Body, Controller, Get, Post, Query, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { ApprovalDto, LoginDto } from './dto/login.dto';
import { JwtStrategy } from './jwt.startegy';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/signup')
    async signUp(
        @Body() signUpDto: SignUpDto,
        @Res() res: Response
    ): Promise<void> {
        const result = await this.authService.signUp(signUpDto);
        res.status(200).json(result);
    }

    @Post('/login')
    async login(
        @Body() loginDto: LoginDto,
        @Res() res: Response,
    ): Promise<void> {
        const result = await this.authService.login(loginDto);
        res.status(200).json(result);
    }

    @Get('filter-by-approval')
    async getUsersByApprovalStatus(@Query('isApproved') isApproved: string) {
        const status = isApproved === 'true';
        return this.authService.getUsersByApprovalStatus(status);
    }

    @Post('/approve')
    @UseGuards(JwtStrategy)
    async approveUser(
        @Body() userApprovalDTo: ApprovalDto,
        @Res() res: Response
    ): Promise<void> {
        const { userId } = userApprovalDTo;
        const result = await this.authService.approveUser(userId);
        res.status(200).json(result);
    }
}
