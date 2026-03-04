"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDropzone } from 'react-dropzone';
import { useState } from 'react';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import Image from "next/image";
import { ICONS } from "@/lib/constants/assets/icons";

const formSchema = z.object({
    fullname: z.string().min(1, {
        message: "Full name is required",
    }),
    phone: z.string().min(1, {
        message: "Phone number is required",
    }),
    email: z.string().email(),
    gender: z.string().min(1, {
        message: "gender is required",
    }),
    dob: z.date({
        message: "Date of birth is required",
    }),
    department: z.string().min(1, {
        message: "Department is required",
    }),
    company: z.string().min(1, {
        message: "Company is required",
    }),
    maritalstatus: z.string().min(1, {
        message: "Marital status is required",
    }),
    designation: z.string().min(1, {
        message: "Designation is required",
    }),
    dateofjoining: z.date({
        message: "Date of joining is required",
    }),
    role: z.string().min(1, {
        message: "Role is required",
    }),
    active: z.boolean().default(false),
});


const AddEmployeeModal = ({
    open,
    onOpenChange,
    onSuccess,
}) => {

    const [file, setFile] = useState(null);
    const [progress, setProgress] = useState(0);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullname: "",
            phone: "",
            email: "",
            gender: "",
            dob: undefined,
            department: "",
            company: "",
            designation: "",
            dateofjoining: undefined,
            maritalstatus: "",
            role: "",
            active: false,
        },

    });

    const onSubmit = async (data) => {
        console.log(data, "data");

    };

    const { getRootProps, getInputProps } = useDropzone({
        accept: { 'image/*': [] },
        onDrop: acceptedFiles => {
            const uploadedFile = acceptedFiles[0];
            setFile(uploadedFile);
            simulateUploadProgress();
        }
    });

    const simulateUploadProgress = () => {
        setProgress(0);
        let percent = 0;

        const interval = setInterval(() => {
            percent += 10;
            setProgress(percent);
            if (percent >= 100) clearInterval(interval);
        }, 200); // change timing as needed
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[816px] h-[90vh] overflow-y-auto pb-3">
                <DialogHeader>
                    <DialogTitle>Add New Employee</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="border-t-[1px] border-grey-400">
                        {/* Add your form fields here */}
                        <div className="px-[36px] space-y-[24px] mt-[20px]">
                            <div className="flex max-w-full gap-6">
                                <FormField
                                    control={form.control}
                                    name="fullname"
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormLabel required>Full Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter full name" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form
                                        .control}
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormLabel required>Phone Number</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter phone number" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="flex  max-w-full gap-6">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormLabel required>Email</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter email" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="gender"
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormLabel required>Gender</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select gender" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="male">Male</SelectItem>
                                                    <SelectItem value="female">Female</SelectItem>
                                                    <SelectItem value="other">Other</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                            </div>
                            <div className="flex  max-w-full gap-6">
                                <FormField
                                    control={form.control}
                                    name="dob"
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormLabel required>Date of birth</FormLabel>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant={"outline"}
                                                            className={cn(
                                                                " pl-3 text-left font-normal",
                                                                !field.value && "text-muted-foreground"
                                                            )}
                                                        >
                                                            {field.value ? (
                                                                format(field.value, "PPP")
                                                            ) : (
                                                                <span>Add date of birth</span>
                                                            )}
                                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-60" />
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0" align="start">
                                                    <Calendar
                                                        mode="single"
                                                        selected={field.value}
                                                        onSelect={field.onChange}
                                                        disabled={(date) =>
                                                            date > new Date() || date < new Date("1900-01-01")
                                                        }
                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="department"
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormLabel required>Department</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger className={"h-[48px]"}>
                                                        <SelectValue placeholder="Select department" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="dep1">Department 1</SelectItem>
                                                    <SelectItem value="dep2">Department 2</SelectItem>
                                                    <SelectItem value="dep3">Department 3</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )} />

                            </div>
                            <div className="flex  max-w-full gap-6">
                                <FormField
                                    control={form.control}
                                    name="company"
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormLabel required>Company</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select company" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="comapany1">comapany 1</SelectItem>
                                                    <SelectItem value="comapany2">comapany 2</SelectItem>
                                                    <SelectItem value="comapany3">comapany 3</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                <FormField
                                    control={form.control}
                                    name="maritalstatus"
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormLabel required>Marital Status</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select marital status" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="married">Married</SelectItem>
                                                    <SelectItem value="single">Single</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                            </div>

                            <div className="flex  max-w-full gap-6">
                                <FormField
                                    control={form.control}
                                    name="designation"
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormLabel required>Designation</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select designation" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="desg1">desg1</SelectItem>
                                                    <SelectItem value="desg2">desg2</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )} />

                                <FormField
                                    control={form.control}
                                    name="dateofjoining"
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormLabel required>Date of joining</FormLabel>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant={"outline"}
                                                            className={cn(
                                                                " pl-3 text-left font-normal",
                                                                !field.value && "text-muted-foreground"
                                                            )}
                                                        >
                                                            {field.value ? (
                                                                format(field.value, "PPP")
                                                            ) : (
                                                                <span>Add date of joining</span>
                                                            )}
                                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-60" />
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0" align="start">
                                                    <Calendar
                                                        mode="single"
                                                        selected={field.value}
                                                        onSelect={field.onChange}
                                                        disabled={(date) =>
                                                            date > new Date() || date < new Date("1900-01-01")
                                                        }
                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="flex max-w-full gap-6">
                                <FormField
                                    control={form.control}
                                    name="role"
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormLabel required>Role</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select role" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="role1">role1</SelectItem>
                                                    <SelectItem value="role2">role2</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )} />

                                <FormField
                                    control={form.control}
                                    name="active"
                                    render={({ field }) => (
                                        <FormItem className={"w-full"}>
                                            <div className="flex items-center">

                                                <FormControl>
                                                    <Checkbox
                                                        checked={field.value}
                                                        onCheckedChange={field.onChange}
                                                        className="h-4 w-4 rounded-[3px] border-[2px] mr-[11px] border-grey-500"
                                                    />

                                                </FormControl>

                                                <FormLabel className={"text-grey-600 font-[700] text-[14px]"}>Active</FormLabel>
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                            </div>
                            <div className="space-y-2">
                                <div {...getRootProps()} className="border border-dashed border-gray-300 p-[37px] rounded-md text-center cursor-pointer">
                                    <input {...getInputProps()} />
                                    <Image src={ICONS.upload.src} alt={ICONS.upload.alt} width={45} height={45} className="mx-auto mb-2" />
                                    <p className="text-gray-500 font-bold text-[20px]">Drop image here  <p className="text-[14px] font-normal"> or <span className="underline">Select file</span></p></p>
                                </div>

                                {file && (
                                    <div className="relative text-sm text-grey-600 flex items-center justify-between bg-indigo-50 p-2 rounded-md overflow-hidden">
                                        {/* Progress overlay */}
                                        {progress > 0 && (
                                            <div
                                                className="absolute top-0 left-0 h-full bg-indigo-200 transition-all duration-300"
                                                style={{ width: `${progress}%` }}
                                            ></div>
                                        )}
                                        {/* Content */}
                                        <span className="relative z-10">{file.name}</span>
                                        <button
                                            onClick={() => { setFile(null); setProgress(0); }}
                                            className="relative z-10 text-red-500 text-xs ml-2 cursor-pointer"
                                        >
                                            <Image src={ICONS.delete.src} alt={ICONS.delete.alt} width={14} height={14} />
                                        </button>
                                    </div>
                                )}
                            </div>
                            <div className="flex justify-end gap-4 pt-4">

                                <Button type="submit" size={"full"} variant={"primary"} className="h-[48px]">Add Employee</Button>
                            </div>

                        </div>

                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};
export default AddEmployeeModal;