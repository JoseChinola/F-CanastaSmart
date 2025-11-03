export interface Users {
    id?: string;
    firstname?: string;
    lastname?: string;
    email?: string;
    avatarUrl?: string;
    role?: Role;
    isActive?: boolean;
}

export interface Role {
    id: string;
    name: string;
    isActive: boolean;
}


export interface Prices {

}

export interface PriceReport {

}

export interface Reviews {

}

export interface ShoppingLists {

}
