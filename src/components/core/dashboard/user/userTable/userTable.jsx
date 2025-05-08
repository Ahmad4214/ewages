"use client";
import React, { useEffect, useState } from "react";
import { DataTable } from "./data-table";
import { columns } from "./column";
import { UserData } from "@/data/UsersData";
import { Check, ChevronDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandInputGrey,
  CommandItem,
} from "@/components/ui/command";
import Image from "next/image";
import { ICONS } from "@/lib/constants/assets/icons";
import dynamic from "next/dynamic"; // <-- Add this import

// Dynamic import for CSVLink (client-side only)
const CSVLink = dynamic(
  () => import("react-csv").then((mod) => mod.CSVLink),
  { ssr: false }
);

const UserTable = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [openDesignation, setOpenDesignation] = useState(false);
  const [openDepartment, setOpenDepartment] = useState(false);
  const [selectedDesignations, setSelectedDesignations] = useState([]);
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);


  // Extract unique departments and designations from data
  const allDepartments = [...new Set(UserData.map(item => item.company.department))];
  const allDesignations = [...new Set(UserData.map(item => item.company.Designation))];

  useEffect(() => {
    const timer = setTimeout(() => {
      setData(UserData);
      setFilteredData(UserData);
      setLoading(false);
    }, 1500); // 1.5 second delay

    return () => clearTimeout(timer); // cleanup
  }, []);

  // Apply filters when selections change
  useEffect(() => {
    if (data.length === 0) return;

    let result = [...data];

    // Filter by designations
    if (selectedDesignations.length > 0) {
      result = result.filter(item =>
        selectedDesignations.includes(item.company.Designation)
      );
    }

    // Filter by departments
    if (selectedDepartments.length > 0) {
      result = result.filter(item =>
        selectedDepartments.includes(item.company.department)
      );
    }

    // Global search filter
    if (searchQuery.trim() !== "") {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(item =>
        JSON.stringify(item).toLowerCase().includes(lowerQuery)
      );
    }

    setFilteredData(result);
  }, [selectedDesignations, selectedDepartments, searchQuery, data]);


  const toggleDesignation = (designation) => {
    setSelectedDesignations(prev =>
      prev.includes(designation)
        ? prev.filter(d => d !== designation)
        : [...prev, designation]
    );
  };

  const toggleDepartment = (department) => {
    setSelectedDepartments(prev =>
      prev.includes(department)
        ? prev.filter(d => d !== department)
        : [...prev, department]
    );
  };

  const resetFilters = () => {
    setSelectedDesignations([]);
    setSelectedDepartments([]);
  };

  // Create filter chip components
  const renderFilterChipsDesg = () => {
    const chips = [
      ...selectedDesignations.map((designation, index) => (
        <div key={`designation-${index}`} className="flex items-center bg-[#6D78FF] rounded-[8px] px-2 py-1 text-[12px] text-grey-50">
          {designation}
          <X
            className="ml-1 h-4 w-4 cursor-pointer"
            onClick={() => toggleDesignation(designation)}
          />
        </div>
      ))
    ];

    return chips.length > 0 ? (
      <div className="flex flex-wrap gap-2 my-3">
        {chips}
      </div>
    ) : null;
  };

  const renderFilterChipsDep = () => {
    const chips = [

      ...selectedDepartments.map((department, index) => (
        <div key={`department-${index}`} className="flex items-center bg-[#6D78FF] rounded-[8px] px-2 py-1 text-[12px] text-grey-50">
          {department}
          <X
            className="ml-1 h-[14px] w-[14px] cursor-pointer"
            onClick={() => toggleDepartment(department)}
          />
        </div>
      ))
    ];

    return chips.length > 0 ? (
      <div className="flex flex-wrap gap-2 my-3">
        {chips}
      </div>
    ) : null;
  };

  const headers = [
    { label: "Name", key: "employee_name.name" },
    { label: "Username", key: "employee_name.username" },
    { label: "Date of Joining", key: "employee_name.dateofjoining" },
    { label: "Company", key: "company.name" },
    { label: "Department", key: "company.department" },
    { label: "Designation", key: "company.Designation" },
    { label: "Email", key: "contact.email" },
    { label: "Phone", key: "contact.Phone" },
    { label: "Telephone", key: "contact.telephone" }
  ];

  const exportData = filteredData.map(user => ({
    ...user,
  }));


  return (
    <div className="px-[24px] pt-[36px] h-[85%]">
      <div className="bg-grey-50 p-6 mb-6  rounded-2xl">
      <div className="flex flex-col justify-between sm:flex-row gap-4 mb-6">
        <div className="w-full flex gap-[12px] md:w-1/5">
        <Command>
          <CommandInputGrey placeholder="Search" 
          value={searchQuery}
          type="text"
          onValueChange={setSearchQuery}
          className={" "} />
        </Command>
          
          <Button
            onClick={() => setShowFilters(!showFilters)}
           size="icon" className={"bg-grey-300 hover:bg-grey-400 h-[40px] w-[40px] text-grey-700"} >
            <Image src={ICONS.filter.src} alt={ICONS.filter.alt} width={24} height={24} />
          </Button>
        </div>
        <div className="flex gap-4">
          <CSVLink data={exportData} headers={headers} filename="user_data.csv">
            <Button className={"bg-grey-300 hover:bg-grey-400 w-[130px] text-grey-700"}>
              <Image src={ICONS.export.src} alt={ICONS.export.alt} width={24} height={24} />
              Export
            </Button>
          </CSVLink>
          <Button className={"bg-[#5762E3] hover:bg-[#3948e4] w-[160px] text-grey-50"}>Add Employee</Button>
        </div>
      </div>
      <div className={`flex flex-col justify-between md:flex-row gap-4  ${showFilters ? "block" : "hidden"}`}>
        <div className="flex flex-col md:flex-row gap-6 w-full md:w-1/2">
          {/* Department Filter */}
          <Popover open={openDepartment} onOpenChange={setOpenDepartment} >
            <PopoverTrigger asChild>
              <Button variant="outline" className={`w-full md:w-75 text-grey-600 font-[400] h-[40px] ${openDepartment ? "border-[#AEB5FF]" : "border-grey-500"} shadow-none justify-between`}>
                Department
                <ChevronDown className={`ml-2 h-4 w-4 shrink-0 duration-300 text-grey-500 ${openDepartment ? "rotate-180" : ""}`} />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full md:w-75 p-0 px-[16px]">
              {renderFilterChipsDep()}
              <Command>
                <CommandInput placeholder="Search" />
                <CommandEmpty>No department found.</CommandEmpty>
                <CommandGroup className="max-h-64 overflow-y-auto">
                  {allDepartments.map((department) => (
                    <CommandItem
                      key={department}
                      onSelect={() => {
                        toggleDepartment(department);
                        setOpenDepartment(true);
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-4 h-4 border rounded flex items-center justify-center ${selectedDepartments.includes(department) ? 'bg-primary border-primary' : 'border-[#6D78FF] border-[2px]'}`}>
                          {selectedDepartments.includes(department) && <Check className="h-3 w-3 rounded-[4px] bg-[#6D78FF] p-[2px]  text-white" />}
                        </div>
                        {department}
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>

          {/* Designation Filter ....ghghg */}
          <Popover open={openDesignation} onOpenChange={setOpenDesignation}>
            <PopoverTrigger asChild>
              <Button variant="outline" className={`w-full md:w-75 text-grey-600 font-[400] h-[40px] ${openDesignation ? "border-[#AEB5FF]" : "border-grey-500"} shadow-none justify-between`}>
                Designation
                <ChevronDown className={`ml-2 h-4 w-4 shrink-0 duration-300 text-grey-500 ${openDesignation ? "rotate-180" : ""}`} />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full md:w-75 p-0 px-[16px]">
              {renderFilterChipsDesg()}
              <Command>
                <CommandInput placeholder="Search" />
                <CommandEmpty>No designation found.</CommandEmpty>
                <CommandGroup className="max-h-64 overflow-y-auto">
                  {allDesignations.map((designation) => (
                    <CommandItem
                      key={designation}
                      onSelect={() => {
                        toggleDesignation(designation);
                        setOpenDesignation(true);
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-4 h-4 border rounded flex items-center justify-center ${selectedDesignations.includes(designation) ? 'bg-primary border-primary' : 'border-[#6D78FF] border-[2px]'}`}>
                          {selectedDesignations.includes(designation) && <Check className="h-3 w-3 rounded-[4px] bg-[#6D78FF] p-[2px]  text-white" />}
                        </div>
                        {designation}
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        {/* Reset Filter Button */}
        <Button
          variant="deleteoutline"
          onClick={resetFilters}
        >
          Reset filters
        </Button>
      </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-full text-muted-foreground text-sm">
          Loading...
        </div>
      ) : (
        <DataTable columns={columns} data={filteredData} />
      )}
    </div>
  );
};

export default UserTable;