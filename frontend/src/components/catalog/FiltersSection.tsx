/* eslint-disable max-len */
import { AGE_OPTIONS, CATEGORY_OPTIONS, GENDER_OPTIONS } from '@/constants';
import type { GetAgeDTO, GetGenderDTO, GetCategoryDTO, GetProductsQueryParams } from '@/api';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Label,
  Button,
  RadioGroup,
  RadioGroupItem,
} from '../shadcn';

type FiltersSectionProps = {
  category: GetCategoryDTO;
  age: GetAgeDTO;
  gender: GetGenderDTO;
  onFilterChange: (data: GetProductsQueryParams) => void;
  onResetFilters: () => void;
};

export const FiltersSection: React.FC<FiltersSectionProps> = ({
  category,
  age,
  gender,
  onFilterChange,
  onResetFilters,
}) => {
  return (
    <div className="h-fit p-6 bg-zinc-950 bg-opacity-90 backdrop-blur-sm border-2 border-zinc-900 rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-4 text-center zinc-900">Filters</h2>
      <div className="flex flex-col gap-6 mb-8">
        <div>
          <h3 className="font-semibold mb-2">Category</h3>
          <RadioGroup
            value={category}
            onValueChange={value => onFilterChange({ category: value as GetCategoryDTO, age, gender })}
          >
            <div className="flex flex-col flex-wrap gap-2 sm:flex-row sm:gap-4 lg:flex-col lg:gap-2">
              {CATEGORY_OPTIONS.map(category => (
                <div key={category.value} className="flex items-center gap-2">
                  <RadioGroupItem value={category.value} id={category.value} />
                  <Label htmlFor={category.value}>{category.label}</Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </div>
        <div className="flex flex-col gap-6 sm:flex-row lg:flex-col">
          <div>
            <h3 className="font-semibold mb-2">Age Category</h3>
            <Select value={age} onValueChange={value => onFilterChange({ category, age: value as GetAgeDTO, gender })}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Age" />
              </SelectTrigger>
              <SelectContent>
                {AGE_OPTIONS.map(age => (
                  <SelectItem key={age.value} value={age.value}>
                    {age.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Gender</h3>
            <Select
              value={gender}
              onValueChange={value => onFilterChange({ category, age, gender: value as GetGenderDTO })}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Gender" />
              </SelectTrigger>
              <SelectContent>
                {GENDER_OPTIONS.map(gender => (
                  <SelectItem key={gender.value} value={gender.value}>
                    {gender.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <Button type="button" variant="secondary" onClick={onResetFilters}>
        Reset Filters
      </Button>
    </div>
  );
};
