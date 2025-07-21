'use client';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { format } from 'date-fns';
import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react';
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
        duration: null as (typeof duration)[0] | null,
        dateNeeded: '',
        justification: '',
    });

    // Fixed: State for managing multiple requests with all required fields
    const [requests, setRequests] = useState([
        {
            id: 1,
            username: '', // Fixed: was 'name' before
            application: null as (typeof applications)[0] | null,
            accessType: null as (typeof accessType)[0] | null,
            duration: null as (typeof duration)[0] | null,
            startDate: '', // Fixed: added missing field
            endDate: '', // Fixed: added missing field
            dateNeeded: '',
            justification: '',
        },
    ]);

    // Function to add new request
    const addNewRequest = () => {
        const newRequest = {
            id: Date.now(),
            username: '',
            application: null as (typeof applications)[0] | null,
            accessType: null as (typeof accessType)[0] | null,
            duration: null as (typeof duration)[0] | null,
            startDate: '',
            endDate: '',
            dateNeeded: '',
            justification: '',
        };
        setRequests([...requests, newRequest]);
    };

    // Function to remove request row
    const removeRequest = (id: number) => {
        setRequests(requests.filter((request) => request.id !== id));
    };

    // Function to update request data
    const updateRequest = (id: number, field: string, value: any) => {
        setRequests(requests.map((request) => (request.id === id ? { ...request, [field]: value } : request)));
    };

    // Separate state for each dropdown (you can remove these if not using them)
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

    // Input change handler
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
        const selectedDuration = duration.find((dur) => dur.value === selectedValue);
        setFormData((prev) => ({
            ...prev,
            duration: selectedDuration || null, // Fixed: was 'Duration' before
        }));
        setDurationOpen(false);
    };

    // Date Picker Handler
    const handleDate = (dateNeeded: Date | undefined) => {
        setDate(dateNeeded);
        setDatePickerOpen(false);

        if (dateNeeded) {
            const formattedDate = format(dateNeeded, 'yyyy-MM-dd');
            setFormData((prev) => ({
                ...prev,
                dateNeeded: formattedDate,
            }));
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // ✅ Simple validation (you can customize this)
        if (!formData.name || requests.length === 0) {
            alert('Please fill in your name and at least one request.');
            return;
        }

        const hasMissingFields = requests.some((req) => {
            return (
                !req.username ||
                !req.application ||
                !req.accessType ||
                !req.duration ||
                !req.startDate ||
                !req.endDate ||
                !req.dateNeeded ||
                !req.justification
            );
        });

        if (hasMissingFields) {
            alert('Please complete all fields in each request.');
            return;
        }

        // ✅ Simulate form submission
        console.log('📝 Submitted Data:');
        console.log('Form Info:', formData);
        console.log('Request Details:', requests);

        alert('Request submitted successfully!');

        // ✅ Optional: Reset form and requests
        handleReset();
    };

    // ✅ Reset function - resets all form data and requests to initial state
    const handleReset = () => {
        // Confirmation dialog to prevent accidental resets

        const currentDate = new Date().toISOString().split('T')[0];

        // Reset form data to initial state with current user info
        setFormData({
            name: auth.user?.name || '',
            department: auth.user?.department || '',
            company: auth.user?.company || '',
            date: currentDate,
            username: '',
            application: null,
            accessType: null,
            duration: null,
            dateNeeded: '',
            justification: '',
        });

        // Reset requests to initial state with one empty request
        setRequests([
            {
                id: Date.now(),
                username: '',
                application: null,
                accessType: null,
                duration: null,
                startDate: '',
                endDate: '',
                dateNeeded: '',
                justification: '',
            },
        ]);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Request" />

            <div className="px-4 sm:px-0">
                <div className="overflow-hidden rounded-lg border border-gray-300 bg-white shadow-sm">
                    {/* Header */}
                    <div className="border-b border-gray-200 bg-gray-50 px-4 py-3 text-center">
                        <h3 className="text-base font-semibold text-gray-800 sm:text-lg">Requestor's Information</h3>
                    </div>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {/* First Row: Name and Date */}
                        <div className="mx-4 mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-12">
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
                        <div className="mx-4 mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-12">
                            <div>
                                <label htmlFor="company" className="mb-2 block text-sm font-bold text-gray-700">
                                    Business Unit Entity
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

                        {/* Request Details Container */}
                        <div className="mx-2 mt-4 overflow-hidden rounded-lg border border-gray-300 bg-white shadow-sm sm:mx-0">
                            {/* Header */}
                            <div className="border-b border-gray-200 bg-gray-50 px-4 py-3 text-center">
                                <h3 className="text-base font-semibold text-gray-800 sm:text-lg">Access Request Details</h3>
                            </div>

                            {/* Table Header - Hidden on mobile, visible on desktop */}
                            <div className="hidden gap-2 border-b border-gray-200 bg-blue-50 px-4 py-3 text-center text-sm font-medium text-gray-700 lg:grid lg:grid-cols-9">
                                <div>
                                    User Name <span className="text-red-500">*</span>
                                </div>
                                <div>
                                    Application/System <span className="text-red-500">*</span>
                                </div>
                                <div>Access Type</div>
                                <div>
                                    Access Duration <span className="text-red-500">*</span>
                                </div>
                                <div>
                                    Start Date <span className="text-red-500">*</span>
                                </div>
                                <div>
                                    End Date <span className="text-red-500">*</span>
                                </div>
                                <div>
                                    Date Needed <span className="text-red-500">*</span>
                                </div>
                                <div>
                                    Justification <span className="text-red-500">*</span>
                                </div>
                                <div>Delete</div>
                            </div>

                            {/* Request Rows */}
                            {requests.map((request) => (
                                <div key={request.id} className="border-b border-gray-100">
                                    {/* Mobile Layout - Card Style */}
                                    <div className="block space-y-4 p-4 lg:hidden">
                                        <div className="flex items-center justify-between">
                                            <h4 className="text-sm font-medium text-gray-900">Request #{request.id}</h4>
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => removeRequest(request.id)}
                                                disabled={requests.length === 1}
                                                className="h-8 w-8 p-0"
                                            >
                                                ×
                                            </Button>
                                        </div>

                                        <div className="space-y-3">
                                            <div>
                                                <label className="mb-1 block text-xs font-medium text-gray-700">
                                                    User Name <span className="text-red-500">*</span>
                                                </label>
                                                <Input
                                                    type="text"
                                                    value={request.username}
                                                    onChange={(e) => updateRequest(request.id, 'username', e.target.value)}
                                                    placeholder="User Name"
                                                    className="w-full text-sm"
                                                />
                                            </div>

                                            <div>
                                                <label className="mb-1 block text-xs font-medium text-gray-700">
                                                    Application/System <span className="text-red-500">*</span>
                                                </label>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <Button variant="outline" className="w-full justify-between text-sm">
                                                            {request.application ? request.application.label : 'Select Application'}
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
                                                                            onSelect={() => {
                                                                                updateRequest(request.id, 'application', app);
                                                                            }}
                                                                        >
                                                                            <CheckIcon
                                                                                className={cn(
                                                                                    'mr-2 h-4 w-4',
                                                                                    request.application?.value === app.value
                                                                                        ? 'opacity-100'
                                                                                        : 'opacity-0',
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

                                            <div>
                                                <label className="mb-1 block text-xs font-medium text-gray-700">Access Type</label>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <Button variant="outline" className="w-full justify-between text-sm">
                                                            {request.accessType ? request.accessType.label : 'Select Type'}
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
                                                                            onSelect={() => {
                                                                                updateRequest(request.id, 'accessType', access);
                                                                            }}
                                                                        >
                                                                            <CheckIcon
                                                                                className={cn(
                                                                                    'mr-2 h-4 w-4',
                                                                                    request.accessType?.value === access.value
                                                                                        ? 'opacity-100'
                                                                                        : 'opacity-0',
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

                                            <div>
                                                <label className="mb-1 block text-xs font-medium text-gray-700">
                                                    Access Duration <span className="text-red-500">*</span>
                                                </label>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <Button variant="outline" className="w-full justify-between text-sm">
                                                            {request.duration ? request.duration.label : 'Select Duration'}
                                                            <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                        </Button>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-full p-0">
                                                        <Command>
                                                            <CommandList>
                                                                <CommandGroup>
                                                                    {duration.map((dur) => (
                                                                        <CommandItem
                                                                            key={dur.value}
                                                                            value={dur.value}
                                                                            onSelect={() => {
                                                                                updateRequest(request.id, 'duration', dur);
                                                                            }}
                                                                        >
                                                                            <CheckIcon
                                                                                className={cn(
                                                                                    'mr-2 h-4 w-4',
                                                                                    request.duration?.value === dur.value
                                                                                        ? 'opacity-100'
                                                                                        : 'opacity-0',
                                                                                )}
                                                                            />
                                                                            {dur.label}
                                                                        </CommandItem>
                                                                    ))}
                                                                </CommandGroup>
                                                            </CommandList>
                                                        </Command>
                                                    </PopoverContent>
                                                </Popover>
                                            </div>

                                            <div className="grid grid-cols-2 gap-3">
                                                <div>
                                                    <label className="mb-1 block text-xs font-medium text-gray-700">
                                                        Start Date <span className="text-red-500">*</span>
                                                    </label>
                                                    <Input
                                                        type="date"
                                                        value={request.startDate}
                                                        onChange={(e) => updateRequest(request.id, 'startDate', e.target.value)}
                                                        className="w-full text-sm"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="mb-1 block text-xs font-medium text-gray-700">
                                                        End Date <span className="text-red-500">*</span>
                                                    </label>
                                                    <Input
                                                        type="date"
                                                        value={request.endDate}
                                                        onChange={(e) => updateRequest(request.id, 'endDate', e.target.value)}
                                                        className="w-full text-sm"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="mb-1 block text-xs font-medium text-gray-700">
                                                    Date Needed <span className="text-red-500">*</span>
                                                </label>
                                                <Input
                                                    type="date"
                                                    value={request.dateNeeded}
                                                    onChange={(e) => updateRequest(request.id, 'dateNeeded', e.target.value)}
                                                    className="w-full text-sm"
                                                />
                                            </div>

                                            <div>
                                                <label className="mb-1 block text-xs font-medium text-gray-700">
                                                    Justification <span className="text-red-500">*</span>
                                                </label>
                                                <Input
                                                    type="text"
                                                    value={request.justification}
                                                    onChange={(e) => updateRequest(request.id, 'justification', e.target.value)}
                                                    placeholder="Click to add justification"
                                                    className="w-full text-sm"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Desktop Layout - Grid Style */}
                                    <div className="hidden items-center gap-2 px-4 py-3 lg:grid lg:grid-cols-9">
                                        {/* User Name */}
                                        <div>
                                            <Input
                                                type="text"
                                                value={request.username}
                                                onChange={(e) => updateRequest(request.id, 'username', e.target.value)}
                                                placeholder="User Name"
                                                className="w-full text-sm"
                                            />
                                        </div>

                                        {/* Application/System */}
                                        <div>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button variant="outline" className="w-full justify-between text-sm">
                                                        {request.application ? request.application.label : 'Select Application'}
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
                                                                        onSelect={() => {
                                                                            updateRequest(request.id, 'application', app);
                                                                        }}
                                                                    >
                                                                        <CheckIcon
                                                                            className={cn(
                                                                                'mr-2 h-4 w-4',
                                                                                request.application?.value === app.value
                                                                                    ? 'opacity-100'
                                                                                    : 'opacity-0',
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

                                        {/* Access Type */}
                                        <div>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button variant="outline" className="w-full justify-between text-sm">
                                                        {request.accessType ? request.accessType.label : 'Select Type'}
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
                                                                        onSelect={() => {
                                                                            updateRequest(request.id, 'accessType', access);
                                                                        }}
                                                                    >
                                                                        <CheckIcon
                                                                            className={cn(
                                                                                'mr-2 h-4 w-4',
                                                                                request.accessType?.value === access.value
                                                                                    ? 'opacity-100'
                                                                                    : 'opacity-0',
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

                                        {/* Access Duration */}
                                        <div>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button variant="outline" className="w-full justify-between text-sm">
                                                        {request.duration ? request.duration.label : 'Select Duration'}
                                                        <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-full p-0">
                                                    <Command>
                                                        <CommandList>
                                                            <CommandGroup>
                                                                {duration.map((dur) => (
                                                                    <CommandItem
                                                                        key={dur.value}
                                                                        value={dur.value}
                                                                        onSelect={() => {
                                                                            updateRequest(request.id, 'duration', dur);
                                                                        }}
                                                                    >
                                                                        <CheckIcon
                                                                            className={cn(
                                                                                'mr-2 h-4 w-4',
                                                                                request.duration?.value === dur.value ? 'opacity-100' : 'opacity-0',
                                                                            )}
                                                                        />
                                                                        {dur.label}
                                                                    </CommandItem>
                                                                ))}
                                                            </CommandGroup>
                                                        </CommandList>
                                                    </Command>
                                                </PopoverContent>
                                            </Popover>
                                        </div>

                                        {/* Start Date */}
                                        <div>
                                            <Input
                                                type="date"
                                                value={request.startDate}
                                                onChange={(e) => updateRequest(request.id, 'startDate', e.target.value)}
                                                className="w-full text-sm"
                                            />
                                        </div>

                                        {/* End Date */}
                                        <div>
                                            <Input
                                                type="date"
                                                value={request.endDate}
                                                onChange={(e) => updateRequest(request.id, 'endDate', e.target.value)}
                                                className="w-full text-sm"
                                            />
                                        </div>

                                        {/* Date Needed */}
                                        <div>
                                            <Input
                                                type="date"
                                                value={request.dateNeeded}
                                                onChange={(e) => updateRequest(request.id, 'dateNeeded', e.target.value)}
                                                className="w-full text-sm"
                                            />
                                        </div>

                                        {/* Justification */}
                                        <div>
                                            <Input
                                                type="text"
                                                value={request.justification}
                                                onChange={(e) => updateRequest(request.id, 'justification', e.target.value)}
                                                placeholder="Click to add justification"
                                                className="w-full text-sm"
                                            />
                                        </div>

                                        {/* Delete Button */}
                                        <div className="flex justify-center">
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => removeRequest(request.id)}
                                                disabled={requests.length === 1}
                                                className="h-8 w-8 p-0"
                                            >
                                                ×
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* Add New Request Button */}
                            <div className="border-t border-gray-200 bg-gray-50 px-4 py-3">
                                <Button type="button" variant="outline" onClick={addNewRequest} className="w-full text-sm sm:text-base">
                                    + Add New Request
                                </Button>
                            </div>
                        </div>
                        {/* Submit and Reset Buttons */}
                    </form>
                </div>
                <div className="flex flex-col gap-4 pt-4 sm:flex-row">
                    <Button type="button" variant="destructive" onClick={handleReset} className="w-full cursor-pointer sm:w-[200px]">
                        Reset
                    </Button>

                    <Button type="submit" className="w-full cursor-pointer sm:w-[200px]">
                        Submit Request
                    </Button>
                </div>
            </div>
        </AppLayout>
    );
}
