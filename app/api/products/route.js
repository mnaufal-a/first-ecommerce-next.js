import { prisma } from "../../../lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(req) {
    try {

        const { searchParams } = new URL(req.url)
    
        const page = Number(searchParams.get("page")) || 1
        const limit = Number(searchParams.get("limit")) || 5
        const searchParam = searchParams.get("search")

    
        const search =
                typeof searchParam === "string"
                    ? searchParam.trim()
                    : ""
    
    
        const skip = (page - 1) * limit
    
        const where = 
            search.length > 0
            ? {
                name : {
                    contains: search.toLowerCase()
                }
            }
        : {}
    
    
        const [products, total] = await Promise.all([
            prisma.product.findMany({
                where,
                skip,
                take : limit,
                orderBy: { createdAt: "desc" },
            }),
            prisma.product.count({ where })
        ])
    
    
        return Response.json({
            data : products,
            total,
            page,
            totalPages: Math.ceil(total /  limit)
        })
    } catch (error) {
        console.error("GET PRODUCTS ERROR:", error)

        return Response.json(
            { message: "Internal Server Error" },
            { status: 500 }
        )
    }
}

export async function POST(req) {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "ADMIN") {
        return Response.json (
            { message: "Unauthourized" },
            { status: 401 }
        )
    }

    const body = await req.json()

    const existing = await prisma.product.findFirst({
      where : { name: body.name }  
    })

    if (existing) {
        return Response.json(
            { message: "Produk sudah ada!" },
            { status: 400 }
        )
    }
    
    const product = await prisma.product.create({
        data: {
            name: body.name,
            price: body.price,
            image: body.image
        }
    })


    return Response.json(product)
}

export async function PUT(req) {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== "ADMIN") {
        return Response.json(
            { message: "Unauthorized" },
            { status: 401 }
        )
    }

    const body = await req.json()

    const updateProduct = await prisma.product.update({
        where : { id : body.id },
        data : {
            name: body.name,
            price: body.price,
            image: body.image
        }
    })

    return Response.json(updateProduct)
}

export async function DELETE(req) {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "ADMIN") {
        return Response.json (
            { message: "Unauthorized" },
            { status: 401 }
        )
    }

    const { id } = await req.json()
    
    await prisma.product.delete({
        where: { id }
    })

    return Response.json({ message: "Deleted" })
}