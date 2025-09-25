import DataTable from "@/components/ui/DataTable";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { COLUMN_LISTS_CATEGORY } from "./Category.constants";
import { LIMIT_LISTS } from "@/constants/list.constants";

const Category = () => {
  const { push } = useRouter();
  const renderCell = useCallback(
    (category: Record<string, unknown>, columnKey: Key) => {
      const cellValue = category[columnKey as keyof typeof category];

      switch (columnKey) {
        case "icon":
          return (
            <Image src={`${cellValue}`} alt="icon" width={100} height={200} />
          );
        case "actions":
          return (
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <CiMenuKebab className="text-default-700" />
                </Button>
              </DropdownTrigger>

              <DropdownMenu>
                <DropdownItem
                  key={"detail-category"}
                  onPress={() => push(`/admin/category/${category._id}`)}
                >
                  Detail Category
                </DropdownItem>
                <DropdownItem
                  key={"delete-category"}
                  className="text-danger-500"
                >
                  Delete Category
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          );

        default:
          return cellValue as ReactNode;
      }
    },
    [push],
  );

  return (
    <section>
      <DataTable
        buttonTopContentLabel="Create Category"
        columns={COLUMN_LISTS_CATEGORY}
        currentPage={1}
        emptyContent="No category found"
        data={[
          {
            _id: "123",
            name: "Category 1",
            description: "This is category 1",
            icon: "/images/general/logo.png",
          },
          {
            _id: "124",
            name: "Category 2",
            description: "This is category 2",
            icon: "/images/general/logo.png",
          },
          {
            _id: "125",
            name: "Category 3",
            description: "This is category 3",
            icon: "/images/general/logo.png",
          },
        ]}
        limit={LIMIT_LISTS[0].label}
        onChangeLimit={() => {}}
        onChangePage={() => {}}
        onChangeSearch={() => {}}
        onClearSearch={() => {}}
        onClickButtonTopContent={() => {}}
        renderCell={renderCell}
        totalPage={2}
      />
    </section>
  );
};

export default Category;
