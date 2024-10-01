import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";


export const GET = async (request, { params }) => {
    try {
        await connectToDB()
        // find all prompts with the given tag
        const prompts = await Prompt.find({ tag: params.id }).populate("creator")    
        return new Response(JSON.stringify(prompts), { status: 200 })

    } catch (error) {
        return new Response("Internal Server Error", { status: 500 });
    }
}
