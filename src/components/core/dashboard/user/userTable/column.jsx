import { Button } from "@/components/ui/button";
import { ICONS } from "@/lib/constants/assets/icons";
import { IMAGES } from "@/lib/constants/assets/images";
import { createColumnHelper } from "@tanstack/react-table";
import { ArrowUpDown, DollarSignIcon } from "lucide-react";
import Image from "next/image";

const columnHelper = createColumnHelper();

export const columns = [
  columnHelper.accessor("employee_name", {
    header: ({ column }) => (
      <Button
        variant="ghost"
        className={"text-grey-700 text-[16px] font-[600]"}
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Employee name
        <ArrowUpDown className="ml-[10px] text-grey-500 h-5 w-5" />
      </Button>
    ),
    sortingFn: (rowA, rowB) =>
      rowA.original.employee_name.name.localeCompare(rowB.original.employee_name.name),
    cell: ({ row }) => {
      const data = row.original.employee_name;
      return (
        <div className="flex gap-4">
          <Image
            src={IMAGES.avatar.src} 
            alt= {IMAGES.avatar.alt}
            width={32}
            height={32}
            className="h-[32px] w-[32px]"
          />
          <div >
            <div className="text-[16px] text-grey-600 font-[500]">{data.name}</div>
            <div className="text-xs text-grey-600 ">Username: {data.username}</div>
            <div className="text-xs text-grey-600">Date Of Joining: {data.dateofjoining}</div>
          </div>
        </div>
      );
    },
  }),
  columnHelper.accessor("company", {
    header: ({ column }) => (
      <Button
        variant="ghost"
        className={"text-grey-700 text-[16px] font-[600]"}
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Company
        <ArrowUpDown className="ml-[10px] text-grey-500 h-5 w-5" />
      </Button>
    ),
    sortingFn: (rowA, rowB) =>
      rowA.original.company.name.localeCompare(rowB.original.company.name),
    cell: ({ row }) => {
      const data = row.original.company;
      return (
        <div >
          <div className="text-[16px] text-grey-600 font-[500]">{data.name}</div>
          <div className="text-xs text-grey-600">Department: {data.department}</div>
          <div className="text-xs text-grey-600">Designation: {data.Designation}</div>
        </div>
      );
    },
  }),
  columnHelper.accessor("contact", {
    header: ({ column }) => (
      <Button
        variant="ghost"
        className={"text-grey-700 text-[16px] font-[600]"}
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Contact
        <ArrowUpDown className="ml-[10px] text-grey-500 h-5 w-5" />
      </Button>
    ),
    sortingFn: (rowA, rowB) =>
      rowA.original.contact.email.localeCompare(rowB.original.contact.email),
    cell: ({ row }) => {
      const data = row.original.contact;
      return (
        <div className="text-sm">
          <div className="text-xs text-grey-600">{data.email}</div>
          <div className="text-xs text-grey-600">{data.Phone}</div>
          <div className="text-xs text-grey-600">{data.telephone}</div>
        </div>
      );
    },
  }),
  columnHelper.display({
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <div className="flex gap-[13px]">
          <Button size={"sm"}
            onClick={() => console.log("read", row.original)}
            className="bg-[rgba(41,173,78,0.2)] cursor-pointer hover:bg-[rgba(41,173,78,0.3)]"
          >
            <DollarSignIcon className="text-grey-600 w-[18px] h-[18px]" />
          </Button>

          <Button size={"sm"}
            onClick={() => console.log("delete", row.original)}
            className="bg-[rgba(254,100,66,0.2)] cursor-pointer hover:bg-[rgba(254,100,66,0.3)]"
          >
            <Image src={ICONS.delete.src} alt={ICONS.delete.alt} width={202} height={202} className="w-[18px] h-[18px]" />
          </Button>

          <Button size={"sm"}
            onClick={() => console.log("download", row.original)}
            className="bg-[rgba(255,175,26,0.2)] cursor-pointer hover:bg-[rgba(255,175,26,0.3)]"
          >
            <Image src={ICONS.download.src} alt={ICONS.download.alt} width={202} height={202} className="w-[18px] h-[18px]" />
          </Button>
        </div>
      );
    },
  }),
  
  
];
