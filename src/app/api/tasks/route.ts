// src/app/api/tasks/route.ts
import { NextResponse } from "next/server";
import { supabase } from "../../lib/supabase";

// Obtener todas las tareas
export async function GET() {
  const { data, error } = await supabase.from("tasks").select("*");
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json(data, { status: 200 });
}

// Crear una nueva tarea
export async function POST(req: Request) {
  const { title, description } = await req.json();

  if (!title) {
    return NextResponse.json(
      { error: "Title is required" },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("tasks")
    .insert([{ title, description, completed: false }])
    .select();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json(data[0], { status: 201 });
}
