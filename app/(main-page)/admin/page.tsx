import { redirect } from "next/navigation";
import { checkRole } from "@/utils/roles";
import { SearchUsers } from "./search-users";
import { clerkClient } from "@clerk/nextjs";
import ChangeRoleButton from "./components/change-role-button";
import DeleteUserButton from "@/components/delete-user-button";

export default async function AdminDashboard(params: {
  searchParams: { search?: string };
}) {
  if (!checkRole("admin") && !checkRole("moderator")) {
    redirect("/");
  }

  const query = params.searchParams.search;

  const users = query
    ? await clerkClient.users.getUserList({ query })
    : await clerkClient.users.getUserList({ limit: 10 });

  return (
    <>
      <SearchUsers />
      <div className="flex flex-col items-center mx-auto pt-4 w-1/3 min-w-fit">
        {users.map((user) => {
          if (
            !user.publicMetadata.role ||
            user.publicMetadata.role === "member"
          ) {
            return (
              <div
                key={user.id}
                className="flex justify-between p-3 m-2 bg-secondary w-full rounded-md"
              >
                <div className="flex flex-col">
                  <div>
                    {user.firstName} {user.lastName}
                  </div>
                  <div>
                    {
                      user.emailAddresses.find(
                        (email) => email.id === user.primaryEmailAddressId
                      )?.emailAddress
                    }
                  </div>
                </div>
                <div className="flex flex-col text-end">
                  {checkRole("admin") ? (
                    <div>
                      <ChangeRoleButton
                        id={user.id}
                        email={
                          user.emailAddresses.find(
                            (email) => email.id === user.primaryEmailAddressId
                          )?.emailAddress as string
                        }
                        role={"moderator"}
                      />
                    </div>
                  ) : (
                    <div>Member</div>
                  )}

                  <div>
                    <DeleteUserButton
                      id={user.id}
                      email={
                        user.emailAddresses.find(
                          (email) => email.id === user.primaryEmailAddressId
                        )?.emailAddress as string
                      }
                    />
                  </div>
                </div>
              </div>
            );
          } else if (user.publicMetadata.role === "moderator") {
            return (
              <div
                key={user.id}
                className="flex justify-between p-3 m-2 bg-secondary w-full rounded-md"
              >
                <div className="flex flex-col">
                  <div>
                    {user.firstName} {user.lastName}
                  </div>
                  <div>
                    {
                      user.emailAddresses.find(
                        (email) => email.id === user.primaryEmailAddressId
                      )?.emailAddress
                    }
                  </div>
                </div>

                {checkRole("admin") ? (
                  <div className="flex flex-col text-end">
                    <div>
                      <ChangeRoleButton
                        id={user.id}
                        email={
                          user.emailAddresses.find(
                            (email) => email.id === user.primaryEmailAddressId
                          )?.emailAddress as string
                        }
                        role={"member"}
                      />
                    </div>
                    <div>
                      <DeleteUserButton
                        id={user.id}
                        email={
                          user.emailAddresses.find(
                            (email) => email.id === user.primaryEmailAddressId
                          )?.emailAddress as string
                        }
                      />
                    </div>
                  </div>
                ) : (
                  <div>Moderator</div>
                )}
              </div>
            );
          }
        })}
      </div>
    </>
  );
}
