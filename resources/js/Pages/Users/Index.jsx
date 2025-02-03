import {Deferred, Head, router} from '@inertiajs/react'
import {route} from "ziggy-js";
import App from "@/Layouts/App.jsx";
import Pagination from "@/Components/Pagination.jsx";
import {Dropdown} from "@/Components/Dropdown.jsx";
import Icon from "@/Components/Icon.jsx";
import Button from "@/Components/Button.jsx";
import {useState} from "react";
import Confirm from "../../Components/Confirm.jsx";

export default function Index({users}) {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [user, setUser] = useState(null);

    return (
        <App>
            <Head title="Users" />
            <div className="rounded bg-white dark:bg-gray-900 p-5">
                <div className="flex items-center justify-between mb-3">
                    <div>
                        <h1 className="text-lg font-medium">Users</h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400">All user data</p>
                    </div>
                    <Button href={route('users.create')} color="success">
                        Create
                    </Button>
                </div>
                <table className="w-full text-base">
                    <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-600">
                        <th className="px-1.5 py-1">No</th>
                        <th className="px-1.5 py-1 text-start">Name</th>
                        <th className="px-1.5 py-1 text-start">Username</th>
                        <th className="px-1.5 py-1 text-start">Email</th>
                        <th className="px-1.5 py-1 w-10">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    <Deferred data="users" fallback={
                        <tr>
                            <td colSpan="5" className="text-center py-2">
                                Loading...
                            </td>
                        </tr>
                    }>
                        <UserData
                            users={users}
                            setShowDeleteDialog={setShowDeleteDialog}
                            setUser={setUser}
                        />
                    </Deferred>
                    </tbody>
                </table>
                <div className="mt-4 flex justify-center">
                    <Pagination links={users?.links}/>
                </div>
            </div>
            <Confirm
                title={"Delete User"}
                message={`Are you sure want to delete user ${user?.name}?`}
                submessage={"The deleted items cannot be reversed"}
                isOpen={showDeleteDialog}
                setIsOpen={setShowDeleteDialog}
                positiveButton="Delete"
                negativeButton="Cancel"
                positiveColor={"red"}
                onPositiveClicked={() => router.delete(route('users.destroy', {user}))}
            />
        </App>
    )
}

const UserData = ({users, setShowDeleteDialog, setUser}) => {
    return users?.data?.map((user, index) => (
        <tr key={user.id} className="border-b border-gray-200 dark:border-gray-600">
            <td className="px-1.5 py-1 text-center">{users.from + index}</td>
            <td className="px-1.5 py-1">{user.name}</td>
            <td className="px-1.5 py-1">{user.username}</td>
            <td className="px-1.5 py-1">{user.email}</td>
            <td className="px-1.5 py-1 text-center">
                <Dropdown>
                    <Dropdown.Toggle>
                        <Button>Action <Icon name="chevron-down" size="sm"/></Button>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item href={route('users.show', {user})} prefetch>
                            <Icon name="eye"/> View
                        </Dropdown.Item>
                        <Dropdown.Item href={route('users.edit', {user})}>
                            <Icon name="pencil"/> Edit
                        </Dropdown.Item>
                        <Dropdown.Separator/>
                        <Dropdown.Item
                            onClick={() => {
                                setUser(user);
                                setShowDeleteDialog(true);
                            }}
                            as="button">
                            <Icon name="trash"/> Delete
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </td>
        </tr>
    ))
}
