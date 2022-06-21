import {Client, Entity, Schema} from "redis-om";

const client = new Client();

const connect = async () => {
    if (client.isOpen()) return

    await client.open(process.env.REDIS_URL);
}

class Room extends Entity {}
let schema = new Schema(
    Room,
    {
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
        name: data.name
    });

    return repository.save(room);
}

export const fetchRoom = async () => {
    await connect();

    const repository = client.fetchRepository(schema);
    await repository.createIndex();

    const rooms = await repository.search()
        .return.all()
    if (rooms.length === 0) return null;

    return rooms;
}

export const removeRoom = async (data) => {
    await connect();
    console.log(data)
    const repository = client.fetchRepository(schema);
    await repository.createIndex();

    const toBeDeletedRoom = await repository.search().where("name").equals(data.name).returnFirst();
    await repository.remove(toBeDeletedRoom?.entityId)
}

