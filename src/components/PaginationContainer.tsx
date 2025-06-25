import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { useEffect, useState } from "react";

const Number = ({ number }: { number: number }) => {
    return <PaginationItem>
        <PaginationLink href={`/explore?page=${number}`}>{number}</PaginationLink>
    </PaginationItem>
}
const Ellipsis = () => <PaginationItem>
    <PaginationEllipsis />
</PaginationItem>;
export default function PaginationContainer({ total, limit, currentPage }: { total: number, limit: number, currentPage: number }) {
    const [renderArray, setRenderArray] = useState<any[]>([])

    useEffect(() => {
        const totalPage = Math.ceil(total / limit);
        console.log('totalPage', totalPage)
        if (totalPage <= 5) {
            const array = [];
            for (let i = 1; i <= totalPage; i++) {
                array.push(i);
                setRenderArray(array);

            }
        } else {
            let array = []
            if (currentPage <= 2) {
                array = [1, 2, 3, "...", totalPage];
            } else if (currentPage >= totalPage - 1) {
                array = [1, "...", totalPage - 2, totalPage - 1, totalPage];
            } else {
                array = [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPage]
            }
            console.log(array)
            setRenderArray(array)

            // 18:10 | 21:10
            // currentPage <= 2
            // current page >= totalPage-1

        }

    }, [total])

    console.log(renderArray)


    return <Pagination>
        <PaginationContent>
            <PaginationItem>
                <PaginationPrevious href="#" />
            </PaginationItem>
            {
                renderArray.map(num => typeof (num) === "number" ? <Number key={`pagination_${num}_${Math.random()}`} number={num} /> : <Ellipsis key={`ellipsis_${num}_${Math.random()}`} />)
            }

            <PaginationItem>
                <PaginationNext href="#" />
            </PaginationItem>

        </PaginationContent>
    </Pagination>
}