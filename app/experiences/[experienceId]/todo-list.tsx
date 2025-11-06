"use client";

import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Button } from "@whop/react/components";
import {
  Heading,
  Text,
  Card,
  IconButton,
  Checkbox,
  Separator,
  Spinner
} from "frosted-ui";
import { CheckIcon, Cross1Icon, Pencil1Icon, TrashIcon, PlusIcon } from "@radix-ui/react-icons";

interface TodoListProps {
  experienceId: string;
  userId: string;
}

export default function TodoList({ experienceId, userId }: TodoListProps) {
  const [newTodoText, setNewTodoText] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState("");

  const todos = useQuery(api.todo.list, { experienceId, userId });
  const createTodo = useMutation(api.todo.create);
  const toggleComplete = useMutation(api.todo.toggleComplete);
  const removeTodo = useMutation(api.todo.remove);
  const updateTodo = useMutation(api.todo.update);

  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodoText.trim()) {
      await createTodo({
        text: newTodoText.trim(),
        experienceId,
        userId,
      });
      setNewTodoText("");
    }
  };

  const handleToggleComplete = async (id: string) => {
    await toggleComplete({ id });
  };

  const handleRemove = async (id: string) => {
    await removeTodo({ id });
  };

  const handleEdit = (todo: any) => {
    setEditingId(todo._id);
    setEditingText(todo.text);
  };

  const handleSaveEdit = async (id: string) => {
    if (editingText.trim() && editingText !== todos?.find(t => t._id === id)?.text) {
      await updateTodo({ id, text: editingText.trim() });
    }
    setEditingId(null);
    setEditingText("");
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingText("");
  };

  const incompleteTodos = todos?.filter(todo => !todo.completed) || [];
  const completedTodos = todos?.filter(todo => todo.completed) || [];

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <Heading size="4">Todo List</Heading>
        <div className="flex gap-2">
          <span className="text-sm text-gray-11">
            {incompleteTodos.length} active
          </span>
          {completedTodos.length > 0 && (
            <span className="text-sm text-gray-11">
              • {completedTodos.length} completed
            </span>
          )}
        </div>
      </div>

      {/* Add new todo form */}
      <form onSubmit={handleAddTodo} className="mb-6">
        <div className="flex gap-2">
          <div className="flex-1">
            <input
              type="text"
              value={newTodoText}
              onChange={(e) => setNewTodoText(e.target.value)}
              placeholder="Add a new todo..."
              className="w-full px-3 py-2 border border-gray-6 rounded-lg text-sm placeholder-gray-10 focus:outline-none focus:border-gray-8 bg-gray-1"
              autoComplete="off"
            />
          </div>
          <IconButton
            type="submit"
            size="2"
            variant="classic"
            disabled={!newTodoText.trim()}
          >
            <PlusIcon />
          </IconButton>
        </div>
      </form>

      {/* Incomplete todos */}
      {incompleteTodos.length > 0 && (
        <div className="mb-4">
          {incompleteTodos.map((todo) => (
            <div key={todo._id} className="flex items-center gap-3 py-2 border-b border-gray-6 last:border-b-0">
              <Checkbox
                checked={todo.completed}
                onCheckedChange={() => handleToggleComplete(todo._id)}
                size="2"
              />

              {editingId === todo._id ? (
                <div className="flex items-center gap-2 flex-1">
                  <input
                    type="text"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSaveEdit(todo._id);
                      if (e.key === 'Escape') handleCancelEdit();
                    }}
                    className="flex-1 px-2 py-1 border border-gray-6 rounded text-sm focus:outline-none focus:border-gray-8 bg-gray-1"
                    autoComplete="off"
                    autoFocus
                  />
                  <IconButton size="1" variant="ghost" onClick={() => handleSaveEdit(todo._id)}>
                    <CheckIcon />
                  </IconButton>
                  <IconButton size="1" variant="ghost" onClick={handleCancelEdit}>
                    <Cross1Icon />
                  </IconButton>
                </div>
              ) : (
                <>
                  <Text
                    size="2"
                    className="flex-1 cursor-pointer"
                    onClick={() => handleEdit(todo)}
                  >
                    {todo.text}
                  </Text>
                  <IconButton
                    size="1"
                    variant="ghost"
                    onClick={() => handleEdit(todo)}
                  >
                    <Pencil1Icon />
                  </IconButton>
                  <IconButton
                    size="1"
                    variant="ghost"
                    onClick={() => handleRemove(todo._id)}
                  >
                    <TrashIcon />
                  </IconButton>
                </>
              )}
            </div>
          ))}
        </div>
      )}

      {completedTodos.length > 0 && incompleteTodos.length > 0 && (
        <Separator size="2" className="my-2" />
      )}

      {/* Completed todos */}
      {completedTodos.length > 0 && (
        <div>
          {completedTodos.map((todo) => (
            <div key={todo._id} className="flex items-center gap-3 py-2 opacity-60">
              <Checkbox
                checked={todo.completed}
                onCheckedChange={() => handleToggleComplete(todo._id)}
                size="2"
              />

              <Text
                size="2"
                className="flex-1 line-through text-gray-10"
              >
                {todo.text}
              </Text>

              <IconButton
                size="1"
                variant="ghost"
                onClick={() => handleRemove(todo._id)}
                className="text-gray-9"
              >
                <TrashIcon />
              </IconButton>
            </div>
          ))}
        </div>
      )}

      {/* Empty state */}
      {todos === undefined ? (
        <div className="text-center py-8">
          <Text size="2" color="gray">
            Loading todos...
          </Text>
        </div>
      ) : todos.length === 0 ? (
        <div className="text-center py-8">
          <Text size="2" color="gray">
            No todos yet. Add one above to get started!
          </Text>
        </div>
      ) : null}

          </Card>
  );
}