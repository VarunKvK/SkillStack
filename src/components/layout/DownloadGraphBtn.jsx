'use client'

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Download } from "lucide-react"
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

export const DownloadGraphBtn = ({chartId}) => {
    async function handleDownloadPng(){
        const chartElement=document.getElementById(chartId)
        const canvas= await html2canvas(chartElement)
        const link= document.createElement('a')
        link.href=canvas.toDataURL("images/png")
        link.download="graph.png"
        link.click()
    }

    async function handleDownloadJpeg(){
        const chartElement=document.getElementById(chartId)
        const canvas= await html2canvas(chartElement)
        const link= document.createElement('a')
        link.href=canvas.toDataURL("images/jpeg")
        link.download="graph.jpeg"
        link.click()
    }

    async function handleDownloadPdf() {
        const chartElement=document.getElementById(chartId)
        const canvas=await html2canvas(chartElement)
        const image=canvas.toDataURL("images/png")

        const pdf= new jsPDF("landscape","mm","a4")
        pdf.addImage(image,"PNG",10, 10, 280, 150);
        pdf.save("graph.pdf");
    }
    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="dark:text-white text-black bg-white dark:bg-black dark:border-[#1d1d1d]">
                        <Download className="w-4"/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="">
                    <DropdownMenuGroup>
                        <DropdownMenuItem asChild>
                            <Button onClick={handleDownloadPng}>Download Png</Button>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem asChild>
                            <Button onClick={handleDownloadJpeg}>Download Jpeg</Button>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem asChild>
                            <Button onClick={handleDownloadPdf}>Download Pdf</Button>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
