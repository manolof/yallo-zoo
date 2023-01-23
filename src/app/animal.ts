export interface Animal {
	id: string;
	name: string;
	type: string;
	avatar: string;
}

export interface AnimalsDto {
	items: Animal[];
}
