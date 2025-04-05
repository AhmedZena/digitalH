import type { Meta, StoryObj } from "@storybook/react";
import { DataTable } from "./data-table";
import type { ColumnDef } from "@tanstack/react-table";

type User = {
  id: string;
  createdAt: number;
  name: string;
  title: string;
  role: string;
  email: string;
};

const meta: Meta<typeof DataTable<User, unknown>> = {
  component: DataTable,
  title: "Components/DataTable",
};

export default meta;

const data: User[] = [
  {
    id: "1",
    createdAt: Date.now(),
    name: "Jane Cooper",
    title: "Regional Paradigm Technician",
    role: "Admin",
    email: "jane.cooper@example.com",
  },
  {
    id: "2",
    createdAt: Date.now(),
    name: "Cody Fisher",
    title: "Product Directives Officer",
    role: "Owner",
    email: "cody.fisher@example.com",
  },
];

const columns: ColumnDef<User, unknown>[] = [
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "Title",
    accessorKey: "title",
  },
  {
    header: "Role",
    accessorKey: "role",
  },
  {
    header: "Email",
    accessorKey: "email",
  },
];

const paginationProps = {
  currentPage: 1,
  pageSize: 10,
  totalPages: 2,
 setPage: () => {},
};

type Story = StoryObj<typeof DataTable<User, unknown>>;

export const Default: Story = {
  args: {
    data,
    columns,
    pagination: paginationProps,
    isLoading: false,
  },
};

export const Loading: Story = {
  args: {
    data: [],
    columns,
    pagination: paginationProps,
    isLoading: true,
  },
};

export const NoData: Story = {
  args: {
    data: [],
    columns,
    pagination: paginationProps,
    isLoading: false,
  },
};
