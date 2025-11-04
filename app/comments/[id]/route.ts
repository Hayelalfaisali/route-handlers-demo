import { comments } from "../data";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = (await params);
    const comment = comments.find((comment) => comment.id === parseInt(id));
    if (!comment) {
        return new Response("Comment not found", { status: 404 });
    }
    return new Response(JSON.stringify(comment));
}

export async function PATCH(_req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = (await params);
    const index = comments.findIndex((comment) => comment.id === parseInt(id));
    const body = await _req.json();
    if (index === -1) {
        return new Response("Comment not found", { status: 404 });
    }
    comments[index].text = body.text;
    return new Response(JSON.stringify(comments[index]));
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = (await params);
    const comment = comments.find((comment) => comment.id === parseInt(id));
    if (!comment) {
        return new Response("Comment not found", { status: 404 });
    }
    comments.splice(comments.indexOf(comment), 1);
    return new Response(JSON.stringify(comment));
}