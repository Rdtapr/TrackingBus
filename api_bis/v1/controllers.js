const prisma = require("../../prisma/client");
const { resError, resSuccess } = require("../../services/responseHandler");
const ITEM_LIMIT = 2;

exports.create = async (req, res) => {
    try {
        const { nomorPolisi, merk } = req.body;
        const data = await prisma.bis.create({
            data: {
                nomorPolisi: nomorPolisi,
                merek: merk,
            },
        });
        resSuccess({
            res,
            title: "Berhasil menambahkan data bis",
            data: data,
        });
    } catch (error) {
        console.log(error);
        resError({
            res,
            errors: error,
            title: "Gagal memasukan data bis",
            code: 400,
        });
    }
};

exports.list = async (req, res) => {
    try {
        const { search, cursor } = req.query;
        let daftarbis;
        if (search) {
            if (!cursor) {
                daftarbis = await prisma.bis.findMany({
                    where: {
                        nama: {
                            contains: search,
                            mode: "insensitive",
                        },
                    },
                    orderBy: {
                        nama: "asc",
                    },
                    take: ITEM_LIMIT,
                });
            }

            if (cursor) {
                daftarbis = await prisma.bis.findMany({
                    where: {
                        nama: {
                            contains: search,
                            mode: "insensitive",
                        },
                    },
                    orderBy: {
                        nama: "asc",
                    },
                    take: ITEM_LIMIT,
                    skip: 1,
                    cursor: {
                        id: cursor,
                    },
                });
            }
        }
        if (!search) {
            if (!cursor) {
                daftarbis = await prisma.bis.findMany({
                    orderBy: {
                        nama: "asc",
                    },
                    take: ITEM_LIMIT,
                });
            }
            if (cursor) {
                daftarbis = await prisma.bis.findMany({
                    orderBy: {
                        nama: "asc",
                    },
                    take: ITEM_LIMIT,
                    skip: 1,
                    cursor: {
                        id: cursor,
                    },
                });
            }
        }
        return resSuccess({
            res,
            title: "Berhasil menampilkan data bis",
            data: daftarbis,
        });
    } catch (error) {
        resError({
            res,
            errors: error,
            title: "Gagal menampilkan data bis",
            code: 400,
        });
    }
};

exports.edit = async (req, res) => {
    try {
        const { id, nomorPolisi, merk } = req.body;
        const data = await prisma.bis.update({
            where: {
                id: id,
            },
            data: {
                nomorPolisi: nomorPolisi,
                merk: merk,
            },
        });

        return resSuccess({
            res,
            title: "Berhasil mengubah data bis",
            data: data,
        });
    } catch (error) {
        resError({
            res,
            errors: error,
            title: "Gagal mengubah data bis",
            code: 400,
        });
    }
};

exports.delete = async (req, res) => {
    try {
        const { id } = req.body;
        const data = await prisma.bis.delete({
            where: {
                id: id,
            },
        });
        return resSuccess({
            res,
            title: "Berhasil menghapus data bis",
            data: data,
        });
    } catch (error) {
        resError({
            res,
            errors: error,
            title: "Gagal menghapus data bis",
            code: 400,
        });
    }
};
