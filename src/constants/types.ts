import { PaymentType } from './enums';
import React from 'react';

export interface PopupProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface RegisAuth {
    fio: string;
    birthDate: number;
    phone: string;
    email: string;
    password: string;
}
export interface LoginAuth {
    email: string;
    password: string;
}
export interface AuthState {
    email: string;
    password?: string;
    token?: string;
    accessToken?: string;
    refreshToken?: string;
    isAuth?: boolean;
    error?: string;
}

export interface Job {
    address: string;
    categories: string[];
    description: string;
    endDateTime: Date;
    files: File | null;
    limit: number;
    paymentType: PaymentType;
    price: number;
    skills: string[];
    startDateTime: Date;
    title: string;
    workHours: number;
}

export interface UserResponse {
    // id: string;
    userId: string;
    orderId: string;
    userFio: string;
    status: string;
}

export interface FoundItemOrder {
    id: string;
    approvedResponsesCount: number;
    totalResponsesCount: number;
    customerId: string;
    responses: UserResponse[];
    // responseStatus: string;
    fileUrls: string[];
    isActive: boolean;
    paymentType: PaymentType;
    currentUserIsCustomer: boolean;
    title: string;
    description: string;
    address: string;
    startDateTime: Date;
    endDateTime: Date;
    categories: string[];
    skills: string[];
    limit: number;
    workHours: number;
    price: number;
    createDateTime: Date;
    editDateTime: Date | null;
}

export interface FrontObject {
    foundItems: FoundItemOrder[];
    totalCount: number;
}

export interface ApiQueryParamsOrders {
    query?: string;
    tagsList?: string;
    paymentType?: 'Cash' | 'Card' | 'Other';
    startDateTimeAfter?: string;
    endDateTimeBefore?: string;
    sortField?:
        | 'CreateDateTime'
        | 'EditDateTime'
        | 'WorkHours'
        | 'Limit'
        | 'ApprovedResponsesCount'
        | 'Price';
    sortDirection?: 'Ascending' | 'Descending';
    take?: number;
    skip?: number;
}
