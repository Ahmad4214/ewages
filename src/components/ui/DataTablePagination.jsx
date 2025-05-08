import { Button } from "@/components/ui/button";

export function DataTablePagination({ table }) {
  const pageIndex = table.getState().pagination.pageIndex;
  const pageCount = table.getPageCount();

  // Helper function to generate pagination buttons
  const getPageButtons = () => {
    const pages = [];
    const current = pageIndex;
    const total = pageCount;
  
    if (total <= 5) {
      // Show all if pages are less than or equal to 5
      for (let i = 0; i < total; i++) {
        pages.push(i);
      }
    } else {
      if (current <= 1) {
        pages.push(0, 1, 2, "ellipsis", total - 1);
      } else if (current >= total - 2) {
        pages.push(total - 4, total - 3, total - 2, "ellipsis", total - 1);
      } else {
        pages.push(current - 1, current, current + 1, "ellipsis", total - 1);
      }
    }
  
    return pages;
  };
  

  return (
    <div className="flex items-center justify-between px-3">
      <div className="flex-1 text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>

      <div className="flex items-center space-x-6 lg:space-x-8">

        {/* Pagination buttons */}
        <div className="flex items-center space-x-[8px]">
          <Button
            className="h-8 pl-[2px] w-8 bg-transparent text-[16px] text-grey-700 hover:bg-transparent shadow-none cursor-pointer"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Prev
          </Button>

          {/* Numbered page buttons */}
          {getPageButtons().map((page, idx) =>
            page === "ellipsis" ? (
              <Button
                key={idx}
                variant="outline"
                disabled
                className="h-[41px] w-[41px] text-[18px] p-0 cursor-default"
              >
                ...
              </Button>
            ) : (
              <Button
                key={idx}
                variant={pageIndex === page ? "active" : "outline"}
                className="h-[41px] text-[18px] w-[41px] p-0  "
                onClick={() => table.setPageIndex(page)}
              >
                {page + 1}
              </Button>
            )
          )}
          <Button
            className="h-8 w-8 pr-[2px] bg-transparent text-grey-700 text-[16px] hover:bg-transparent shadow-none cursor-pointer"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
