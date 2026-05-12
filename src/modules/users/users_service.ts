import { UsersRepository } from "./users_repository";
import { ObjectId } from "mongodb";

export class UsersService {
    private repository = new UsersRepository();

    async register(data: any) {
        const exists = await this.repository.findByEmail(data.email);
        if (exists) {
            throw new Error('el usuario ya existe');
        }
        return this.repository.create(data);
    }

    async findAllUsers() {
        return this.repository.findAllUsers();
    }

    async findOneUser(id: string) {
        if (!ObjectId.isValid(id)) throw new Error("ID de usuario no válido");
        return this.repository.findById(id);
    }

    async updateUser(id: string, data: any) {
        if (!ObjectId.isValid(id)) throw new Error("ID de usuario no válido para actualizar");
        const { _id, ...updateData } = data;
        return this.repository.update(id, updateData);
    }

    async deleteUser(id: string) {
        if (!ObjectId.isValid(id)) throw new Error("ID de usuario no válido para eliminar");
        return this.repository.delete(id);
    }
}