import { faker } from "@faker-js/faker";
import { createHash } from "../utils/index.js";


class MocksServices {
    //  generar mascotas (sin owner y con adopted en “false”) de acuerdo a un parámetro numérico.
    static async genetarePets(petsQuantity) {
        const pets = [];

        for (let i = 0; i < petsQuantity; i++) {
            pets.push({
                name: faker.person.firstName(),
                specie: faker.animal.type(),
                adopted: false,
                // brithday: faker.date.past(),
                image: "http://via.placeholder.com/150",
            });
        }
        return pets;
    }

    static async genetareUsers(usersQuantity, petsQuantity) {
        const users = [];
        const roles = ["user", "admin"];

        for (let i = 0; i < usersQuantity; i++) {
            let first_name = await faker.person.firstName();
            let last_name = await faker.person.lastName()
            let email = await faker.internet.exampleEmail({ firstName: first_name })
            let pets = !petsQuantity ? [] : await this.genetarePets(petsQuantity);
            users.push({
                _id: faker.database.mongodbObjectId(),
                first_name: first_name,
                last_name: last_name,
                email: email,
                password: await createHash("coder123"),
                role: faker.helpers.arrayElement(roles),
                pets: pets
            });
        }
        return users;
    }

    static async generateData(usersQuantity, petsQuantity) {
        const users = await this.genetareUsers(usersQuantity, petsQuantity);
        
        return users;
    }
}

export default MocksServices;
