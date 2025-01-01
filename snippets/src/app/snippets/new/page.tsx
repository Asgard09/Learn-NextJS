import { db } from "@/db";
import { redirect } from "next/navigation";

export default function SnippetCreatePage() {
  async function createSnippets(formData: FormData) {
    // This needs tobe a server action!
    "use server"; //-> Nextjs treats that function is a server aaction

    // Check the user's inputs and make sure they're valid
    const title = formData.get("title") as string;
    const code = formData.get("code") as string;

    // Create a new record in the database
    const snippet = await db.snippet.create({
    //await ensures the function waits for the database operation to complete before proceeding.
      data: {
        title,
        code,
      },
    });
    console.log(snippet);

    // Redirect the user back to the root route
    redirect("/");
  }

  return (
    <form action={createSnippets}>
      <h3 className="font-bold m-3">Create a Snippets</h3>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <label className="w-12" htmlFor="title">
            Title
          </label>
          <input
            name="title"
            className="border rounded p-2 w-full"
            id="title"
          />
        </div>

        <div className="flex gap-4">
          <label className="w-12" htmlFor="code">
            Code
          </label>
          <textarea
            name="code"
            className="border rounded p-2 w-full"
            id="code"
          />
        </div>

        <button type="submit" className="rounded p-2 bg-blue-200">
          Create
        </button>
      </div>
    </form>
  );
}
