# Table Pagination, Sorting, and Filtering Implementation

This update adds client-side pagination, sorting, and filtering capabilities to all tables in the application (Users, Tenants, Scopes, Applications) using the @tanstack/react-table library.

## Changes Made

1. Added `@tanstack/react-table` dependency to package.json
2. Created reusable table components:
   - `data-table.tsx`: A flexible, reusable table component with built-in pagination, sorting, and filtering
   - `data-table-column-header.tsx`: A sortable column header component
3. Updated all table components to use the new DataTable component:
   - UserTable
   - TenantTable
   - ScopeTable
   - ApplicationTable

## Features Added

- **Pagination**: All tables now have pagination controls that allow users to navigate through pages of data
- **Sorting**: Users can click on column headers to sort the data in ascending or descending order
- **Filtering**: A search box is provided to filter the data based on a specified column
- **Maintained existing functionality**: Row click behavior, action buttons, and dialog interactions work the same as before

## How to Install

Before running the application, you need to install the new dependency:

```bash
npm install @tanstack/react-table@8.13.2
# or
yarn add @tanstack/react-table@8.13.2
# or
pnpm add @tanstack/react-table@8.13.2
```

## Implementation Details

The DataTable component is designed to be flexible and reusable:

- It takes a `columns` definition that specifies how to display and sort each column
- It provides pagination controls with customizable page size
- It includes a search input for filtering data
- It maintains the row click behavior from the original implementation
- It preserves the existing design while adding enhanced functionality

The implementation follows the existing design pattern and does not change the base design of the tables, as requested.
