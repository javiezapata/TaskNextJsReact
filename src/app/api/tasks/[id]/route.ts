// src/app/api/tasks/route.ts
import { NextResponse } from "next/server";
import { supabase } from "../../../lib/supabase";


// Actualizar una tarea
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const { title, description, completed } = await req.json();

  // No change needed here, params.id is already a string
  const { data, error } = await supabase
    .from("tasks")
    .update({ title, description, completed })
    .eq("id", params.id)
    .select();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json(data[0], { status: 200 });
}

// Eliminar una tarea
export async function DELETE(req: Request, { params }: { params: { id: string } }) {

  // No change needed here, params.id is already a string
  const { error } = await supabase.from("tasks").delete().eq("id", params.id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ message: "Task deleted successfully" }, { status: 200 });
}
