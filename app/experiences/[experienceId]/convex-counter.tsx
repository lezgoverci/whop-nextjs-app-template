"use client";

import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Button } from "@whop/react/components";
import { Heading, Text, Badge, Card } from "frosted-ui";

interface ConvexCounterProps {
  experienceId: string;
  userId: string;
}

export default function ConvexCounter({ experienceId, userId }: ConvexCounterProps) {
  const counterLabel = `${experienceId}-${userId}`;
  const counter = useQuery(api.counter.get, { label: counterLabel });
  const increment = useMutation(api.counter.increment);
  const reset = useMutation(api.counter.reset);
  const users = useQuery(api.user.list);
  const createUser = useMutation(api.user.create);

  const handleIncrement = async () => {
    await increment({ label: counterLabel });
  };

  const handleReset = async () => {
    await reset({ label: counterLabel });
  };

  const handleCreateUser = async () => {
    const name = prompt("Enter user name:");
    if (name) {
      await createUser({
        name,
        email: `${name.toLowerCase()}@example.com`
      });
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Experience-specific Counter */}
      <Card>
        <Heading size="5" className="mb-3">🎯 Experience Counter</Heading>
        <Text size="2" color="gray" className="mb-4">
          This counter is specific to your experience ({experienceId}) and user ({userId}) combination.
        </Text>

        <div className="flex items-center justify-between mb-4">
          <Badge color="blue" size="2">
            Count: {counter ?? 0}
          </Badge>
          <Text size="1" color="gray">
            Label: {counterLabel}
          </Text>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={handleIncrement}
            variant="classic"
            size="2"
            disabled={counter === undefined}
          >
            Increment
          </Button>
          <Button
            onClick={handleReset}
            variant="ghost"
            size="2"
            disabled={counter === undefined}
          >
            Reset
          </Button>
        </div>
      </Card>

      {/* User Database */}
      <Card>
        <div className="flex items-center justify-between mb-3">
          <Heading size="5">👥 User Database</Heading>
          <Button onClick={handleCreateUser} variant="classic" size="2">
            Add User
          </Button>
        </div>

        <div className="max-h-48 overflow-y-auto">
          {users === undefined ? (
            <Text size="3" color="gray">Loading users...</Text>
          ) : users.length === 0 ? (
            <Text size="3" color="gray">No users yet. Add one to get started!</Text>
          ) : (
            <div className="space-y-2">
              {users.slice(0, 3).map((user) => (
                <div key={user._id} className="flex items-center justify-between">
                  <div>
                    <Text size="2" weight="medium">{user.name}</Text>
                    {user.email && (
                      <Text size="1" color="gray">{user.email}</Text>
                    )}
                  </div>
                  <Badge color="green" size="1">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </Badge>
                </div>
              ))}
              {users.length > 3 && (
                <Text size="1" color="gray">...and {users.length - 3} more</Text>
              )}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}