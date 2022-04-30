import { DynamicModule, Module } from '@nestjs/common';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../strategies/jwt.strategy';

@Module({
    imports: [
        PassportModule,
    ],
    providers: [
        JwtStrategy,
    ],
    exports: [
        JwtModule,
    ],
})
export class AuthModule
{
    static forRoot(jwtOptions: JwtModuleOptions): DynamicModule
    {
        return {
            module : AuthModule,
            imports: [
                JwtModule.register(jwtOptions),
            ],
        };
    }
}