import { User, Publication } from "@prisma/client";
import { CreatePublicationDto } from "src/dto/create-publication.dto";
import { CreateUserDto } from "src/dto/create-user.dto";

export abstract class AppRepository {
    abstract createUser(createUserDto: CreateUserDto): Promise<User>
    abstract findUserByEmail(email: string): Promise<User>
    abstract findUserById(id: number): Promise<User>
    abstract createPublication(CreatePublicationDto: CreatePublicationDto, user_id: number): Promise<Publication>
    abstract findPublicationByUserId(user_id: number): Promise<Publication[]>
}