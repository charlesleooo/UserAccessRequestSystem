'use client';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { format } from 'date-fns';
import { CalendarIcon, CheckIcon, ChevronsUpDownIcon } from 'lucide-react';
import * as React from 'react';
import { useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create Request',
        href: '/create-request',
    },
];

const applications = [
    { value: 'emailAccess', label: 'Email Access' },
    { value: 'internetAccess', label: 'Internet Access' },
    { value: 'activeDirectoryAccess', label: 'Active Directory Access (MS ENTRA ID)' },
    { value: 'wifiAccess', label: 'Wi-Fi/Access Point Access' },
    { value: 'usbPcPortAccess', label: 'USB/PC-port Access' },
    { value: 'pcAccess', label: 'PC Access' },
    { value: 'serverAccess', label: 'Server Access' },
    { value: 'printerAccess', label: 'Printer Access' },
    { value: 'firewallAccess', label: 'Firewall Access' },
    { value: 'tnaBiometricAccess', label: 'TNA Biometric Device Access' },
    { value: 'cctvAccess', label: 'CCTV Access' },
    { value: 'vpnAccess', label: 'VPN Access' },
    { value: 'offsiteStorageAccess', label: 'Offsite Storage Facility Access' },
];

const accessType = [
    { value: 'full', label: 'Full' },
    { value: 'read', label: 'Read' },
    { value: 'admin', label: 'Admin' },
];

const duration = [
    { value: 'permanent', label: 'Permanent' },
    { value: 'temporary', label: 'Temporary' },
];

export default function Index() {
    const { auth } = usePage<SharedData>().props;

    const [formData, setFormData] = useState({
        name: '',
        department: '',
        company: '',
        date: '',
        username: '',
        application: null as (typeof applications)[0] | null,
        accessType: null as (typeof accessType)[0] | null,
        Duration: null as (typeof duration)[0] | null,
        selectedDate: '',
    });

    // Separate state for each dropdown
    const [applicationOpen, setApplicationOpen] = React.useState(false);
    const [accessTypeOpen, setAccessTypeOpen] = React.useState(false);
    const [DurationOpen, setDurationOpen] = React.useState(false);
    const [date, setDate] = React.useState<Date>();
    const [datePickerOpen, setDatePickerOpen] = React.useState(false);

    // Auto-populate user data and current date
    useEffect(() => {
        const currentDate = new Date().toISOString().split('T')[0];
        setFormData((prev) => ({
            ...prev,
            name: auth.user?.name || '',
            department: auth.user?.department || '',
            company: auth.user?.company || '',
            date: currentDate,
        }));
    }, [auth.user]);

    //Input change handler
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleApplicationSelect = (selectedValue: string) => {
        const selectedApp = applications.find((app) => app.value === selectedValue);
        setFormData((prev) => ({
            ...prev,
            application: selectedApp || null,
        }));
        setApplicationOpen(false);
    };

    const handleAccessTypeSelect = (selectedValue: string) => {
        const selectedAccess = accessType.find((access) => access.value === selectedValue);
        setFormData((prev) => ({
            ...prev,
            accessType: selectedAccess || null,
        }));
        setAccessTypeOpen(false);
    };

    const handleDurationSelect = (selectedValue: string) => {
        const selectedDuration = duration.find((duration) => duration.value === selectedValue);
        setFormData((prev) => ({
            ...prev,
            Duration: selectedDuration || null,
        }));
        setDurationOpen(false);
    };

    // Date Picker Handler
    const handleDate = (selectedDate: Date | undefined) => {
        setDate(selectedDate);
        setDatePickerOpen(false);

        if (selectedDate) {
            const formattedDate = format(selectedDate, 'yyyy-MM-dd');
            setFormData((prev) => ({
                ...prev,
                selectedDate: formattedDate,
            }));
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Add your form submission logic here
        console.log('Form submitted:', formData);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Request" />
            <div className="mx-auto w-full p-5">
                <form className="space-y-2" onSubmit={handleSubmit}>
                    {/* First Row: Name and Date */}
                    <div className="grid grid-cols-2 gap-12 md:grid-cols-2">
                        <div>
                            <label htmlFor="name" className="mb-2 block text-sm font-bold text-gray-700">
                                Name
                            </label>
                            <Input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-full rounded-md border border-gray-400 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                placeholder="Enter your name"
                            />
                        </div>

                        <div>
                            <label htmlFor="date" className="mb-2 block text-sm font-bold text-gray-700">
                                Date
                            </label>
                            <Input
                                type="date"
                                id="date"
                                name="date"
                                value={formData.date}
                                readOnly
                                className="w-full rounded-md border border-gray-400 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Second Row: Company and Department */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-12">
                        <div>
                            <label htmlFor="company" className="mb-2 block text-sm font-bold text-gray-700">
                                Company
                            </label>
                            <Input
                                type="text"
                                id="company"
                                name="company"
                                value={formData.company}
                                onChange={handleInputChange}
                                className="w-full rounded-md border border-gray-400 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                placeholder="Enter your company"
                            />
                        </div>

                        <div>
                            <label htmlFor="department" className="mb-2 block text-sm font-bold text-gray-700">
                                Department
                            </label>
                            <Input
                                type="text"
                                id="department"
                                name="department"
                                value={formData.department}
                                onChange={handleInputChange}
                                className="w-full rounded-md border border-gray-400 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                placeholder="Enter your department"
                            />
                        </div>
                    </div>

                    {/* Third Row: Request Details */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-12">
                        <div>
                            <label htmlFor="username" className="mb-2 block text-sm font-bold text-gray-700">
                                User Name
                            </label>
                            <Input
                                type="text"
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleInputChange}
                                className="w-full rounded-md border border-gray-400 px-2 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                placeholder="Enter Username"
                            />
                        </div>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:gap-4">
                            {/* Application/System Dropdown */}
                            <div>
                                <label className="mb-2 block text-sm font-bold text-gray-700">Select Application/System</label>
                                <Popover open={applicationOpen} onOpenChange={setApplicationOpen}>
                                    <PopoverTrigger asChild>
                                        <Button variant="outline" role="combobox" aria-expanded={applicationOpen} className="w-full justify-between">
                                            {formData.application ? formData.application.label : 'Select application...'}
                                            <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-full p-0">
                                        <Command>
                                            <CommandInput placeholder="Search applications..." />
                                            <CommandList>
                                                <CommandEmpty>No applications found.</CommandEmpty>
                                                <CommandGroup>
                                                    {applications.map((app) => (
                                                        <CommandItem
                                                            key={app.value}
                                                            value={app.value}
                                                            onSelect={() => handleApplicationSelect(app.value)}
                                                        >
                                                            <CheckIcon
                                                                className={cn(
                                                                    'mr-2 h-4 w-4',
                                                                    formData.application?.value === app.value ? 'opacity-100' : 'opacity-0',
                                                                )}
                                                            />
                                                            {app.label}
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                            </div>

                            {/* Access Type Dropdown */}
                            <div>
                                <label className="mb-2 block text-sm font-bold text-gray-700">Access Type</label>
                                <Popover open={accessTypeOpen} onOpenChange={setAccessTypeOpen}>
                                    <PopoverTrigger asChild>
                                        <Button variant="outline" role="combobox" aria-expanded={accessTypeOpen} className="w-full justify-between">
                                            {formData.accessType ? formData.accessType.label : 'Select access type...'}
                                            <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-full p-0">
                                        <Command>
                                            <CommandList>
                                                <CommandGroup>
                                                    {accessType.map((access) => (
                                                        <CommandItem
                                                            key={access.value}
                                                            value={access.value}
                                                            onSelect={() => handleAccessTypeSelect(access.value)}
                                                        >
                                                            <CheckIcon
                                                                className={cn(
                                                                    'mr-2 h-4 w-4',
                                                                    formData.accessType?.value === access.value ? 'opacity-100' : 'opacity-0',
                                                                )}
                                                            />
                                                            {access.label}
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                            </div>
                            {/*Access Duration Dropdown*/}
                            <div>
                                <label className="mb-2 block text-sm font-bold text-gray-700">Access Duration</label>
                                <Popover open={DurationOpen} onOpenChange={setDurationOpen}>
                                    <PopoverTrigger asChild>
                                        <Button variant="outline" role="combobox" aria-expanded={accessTypeOpen} className="w-full justify-between">
                                            {formData.Duration ? formData.Duration.label : 'Select access type...'}
                                            <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-full p-0">
                                        <Command>
                                            <CommandList>
                                                <CommandGroup>
                                                    {duration.map((duration) => (
                                                        <CommandItem
                                                            key={duration.value}
                                                            value={duration.value}
                                                            onSelect={() => handleDurationSelect(duration.value)}
                                                        >
                                                            <CheckIcon
                                                                className={cn(
                                                                    'mr-2 h-4 w-4',
                                                                    formData.Duration?.value === duration.value ? 'opacity-100' : 'opacity-0',
                                                                )}
                                                            />
                                                            {duration.label}
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                            </div>
                            {/* Date Picker Dropdown */}
                            <div>
                                <label className="mb-2 block text-sm font-bold text-gray-700">Date Needed</label>
                                <Popover open={datePickerOpen} onOpenChange={setDatePickerOpen}>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            data-empty={!date}
                                            className="w-[280px] justify-start text-left font-normal data-[empty=true]:text-muted-foreground"
                                        >
                                            <CalendarIcon />
                                            {date ? format(date, 'PPP') : <span>Pick a date</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-full p-0">
                                        <Calendar
                                            mode="single"
                                            selected={date}
                                            onSelect={handleDate}
                                            disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                        <Button type="submit" className="w-full">
                            Submit Request
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
