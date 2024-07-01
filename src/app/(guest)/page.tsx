import Link from "next/link";
import { CircleUser, Menu, Package2, Search } from "lucide-react";

import { Button } from "@sangpencerah/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@sangpencerah/components/ui/card";
import { Checkbox } from "@sangpencerah/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@sangpencerah/components/ui/dropdown-menu";
import { Input } from "@sangpencerah/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@sangpencerah/components/ui/sheet";
import { FormInput } from "@sangpencerah/components/form-input";

export default function Dashboard() {
  return (
    <div className="container mx-auto">
      <div className="flex flex-col items-center justify-center gap-4 py-4">
        <FormInput />
      </div>
    </div>
  );
}
