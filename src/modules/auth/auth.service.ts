import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthModel } from 'src/model/auth.schema';
import * as bcrypt from 'bcrypt';
import { ResponseError } from 'src/shared/response.dto';
import { AuthSigInDTO } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
    constructor(
        @InjectModel(AuthModel.name) private authModel: Model<AuthModel>,
        private jwtService: JwtService,
    ) { }


    async login(data: AuthSigInDTO): Promise<{ token: String } | { error: String[] }> {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        console.log(hashedPassword)
        let user = await this.authModel.findOne({ username: data.username }).exec()

        if (!user) return ResponseError(["Usuario y/o contraseña incorrectos"]);
        const isMatch = await bcrypt.compare(data.password, user.password)
        if (!isMatch) return ResponseError(["Usuario y/o contraseña incorrectos"]);

        let payload = user.toJSON()
        delete payload.password

        return { token: this.jwtService.sign(payload) }
    }


    async refreshToken(userJWT: AuthModel) {
        let user = await this.authModel.findOne({ username: userJWT.username }).exec()

        if (!user) return ResponseError(["El usuario no existe."]);
        let payload = user.toJSON()
        delete payload.password
        return { token: this.jwtService.sign(payload) }

    }

  

    async create(createData: AuthModel): Promise<AuthModel | { error: String[] }> {
        let user = await this.authModel.findOne({ username: createData.username }).exec()
        if (user) return ResponseError(["El usuario ya existe"])
        const password = createData.password;
        const hash = await bcrypt.hash(password, 10);
        createData.password = hash;
        const created = await new this.authModel(createData).save();
        created.password = null
        return created;
    }
}
