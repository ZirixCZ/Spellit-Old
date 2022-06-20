import {Client, Entity, Schema, Repository} from "redis-om";

const client = new Client();

const connect = async () => {
    if (client.isOpen()) return

    await client.open(process.env.REDIS_URL);
}

class Room extends Entity {}
let schema = new Schema(
    Room,
    {
        id: {type: "number"},
        name:  {type: "string"}
    },
    {
        dataStructure: "JSON"
    }
)

export const createRoom = async (data) => {
    await connect();

    const repository = client.fetchRepository(schema);

    const room = repository.createEntity({
        id: data.id,
        name: data.name
    });
    const id = await repository.save(room);
    return id;
}

export const fetchRoom = async () => {
    await connect();

    const repository = client.fetchRepository(schema);
    await repository.createIndex();

    const rooms = await repository.search()
        .return.all()

    return rooms;
}

export const removeRoom = async (data) => {
    await connect();
    console.log(data)
    const repository = client.fetchRepository(schema);
    await repository.createIndex();

    const toBeDeletedRoom = await repository.search().where("id").equals(data.id).returnFirst();
    console.log(toBeDeletedRoom)
    repository.remove(toBeDeletedRoom.entityId)
}

