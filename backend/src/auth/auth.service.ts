/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schma';
import { Model } from 'mongoose';
import { SignUpDto } from './dto/signup.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Role } from './enums/role.enums';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private useModel: Model<User>,
        private jwtService: JwtService,
    ) {}

    async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
        const { name, email, password, role } = signUpDto;
        console.log(role)
        const existingUser = await this.useModel.findOne({ email });

        if (existingUser) {
            throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
        }

        if (!name || typeof(name) !== "string" || !email || !password || typeof(email) !== "string" || typeof(password) !== "string") {
            throw new HttpException("invalid data", HttpStatus.BAD_REQUEST)
        }

        // Hash password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        

        // Create new user
        const user = await this.useModel.create({
            name,
            email,
            password: hashedPassword,
            role: role == "Librarian" ? Role.Admin : Role.User,
        });

        // Generate JWT token
        const token = this.jwtService.sign({ id: user._id }, { expiresIn: '1h' });

        return { token };
    }

    async login(loginDto: LoginDto): Promise<{ token: string }> {
        const { email, password } = loginDto;

        if (!email || !password || typeof(email) !== "string" || typeof(password) !== "string") {
            throw new HttpException("invalid data", HttpStatus.BAD_REQUEST)
        }

        // Find user by email
        const user = await this.useModel.findOne({ email });
        if (!user) {
            throw new HttpException('Invalid email or password', HttpStatus.NOT_FOUND);
        }

        // Compare passwords
        const isPasswordMatched = await bcrypt.compare(password, user.password);
        
        if (!isPasswordMatched) {
            throw new HttpException('Invalid email or password', HttpStatus.UNAUTHORIZED);
        }

        // Generate JWT token
        const token = this.jwtService.sign({ id: user._id }, { expiresIn: '1h' });

        return { token };
    }
    
    async getUsersByApprovalStatus(isApproved: boolean): Promise<User[]> {
        const result = (await this.useModel.find().exec()).filter((user) => user.isApproved === isApproved);
        return result
    }

    async approveUser(userId: string): Promise<User> {
        const user = await this.useModel.findByIdAndUpdate(userId, {
            isApproved: true,
        }, {new:true});
        return user
    }
}
