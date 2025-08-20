'use client';

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { useRouter, useSearchParams } from 'next/navigation';
import { Input } from './input';
import { Search } from 'lucide-react';
import React, { useState } from 'react';

export default function SearchSort() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const currentSort = searchParams.get('sort') || 'popular';
	const currentSearch = searchParams.get('search') || '';
	const [search, setSearch] = useState(currentSearch);

	const onSearchSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const params = new URLSearchParams(searchParams.toString());
		if (search.trim()) {
			params.set('search', search.trim());
		} else {
			params.delete('search');
		}

		if (currentSort && currentSort !== 'popular')
			params.set('sort', currentSort);
		router.push(
			`${window.location.pathname}${
				params.toString() ? '?' + params.toString() : ''
			}`
		);
	};

	const onValueChange = (value: string) => {
		const params = new URLSearchParams(searchParams.toString());
		console.log(params);
		if (value === 'popular') {
			params.delete('sort');
		} else {
			params.set('sort', value);
		}

		if (search) params.set('search', search);

		const queryString = params.toString();
		console.log(queryString);
		router.push(
			`${window.location.pathname}${queryString ? '?' + queryString : ''}`
		);
	};
	return (
		<div className="flex flex-col sm:flex-row mb-8 gap-4">
			<form onSubmit={onSearchSubmit} className="relative flex-1">
				<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
				<Input
					placeholder="Search Blogs...."
					className="pl-10"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
			</form>
			<Select defaultValue={currentSort} onValueChange={onValueChange}>
				<SelectTrigger>
					<SelectValue placeholder="Sort by" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="newest">Newest First</SelectItem>
					<SelectItem value="oldest">Oldest First</SelectItem>
					<SelectItem value="popular">Most Popular</SelectItem>
				</SelectContent>
			</Select>
		</div>
	);
}
