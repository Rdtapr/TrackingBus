const prisma = require("../../prisma/client");
const { resError, resSuccess } = require("../../services/responseHandler");
const ITEM_LIMIT = 2;

exports.create = async (req, res) => {
    try {
        const { nisn, cardID, nama } = req.body;
        const data = await prisma.siswa.create({
            data: {
                nisn: nisn,
                cardId: cardID,
                nama: nama,
            },
        });
        resSuccess({
            res,
            title: "Berhasil menambahkan data siswa",
            data: data,
        });
    } catch (error) {
        resError({
            res,
            errors: error,
            title: "Gagal memasukan data siswa",
            code: 400,
        });
    }
};

exports.list = async (req, res) => {
    try {
        const { search, cursor } = req.query;
        let daftarsiswa;
        if (search) {
            if (!cursor) {
                daftarsiswa = await prisma.siswa.findMany({
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
                daftarsiswa = await prisma.siswa.findMany({
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
                daftarsiswa = await prisma.siswa.findMany({
                    orderBy: {
                        nama: "asc",
                    },
                    take: ITEM_LIMIT,
                });
            }
            if (cursor) {
                daftarsiswa = await prisma.siswa.findMany({
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
            title: "Berhasil menampilkan data siswa",
            data: daftarsiswa,
        });
    } catch (error) {
        resError({
            res,
            errors: error,
            title: "Gagal menampilkan data siswa",
            code: 400,
        });
    }
};

exports.edit = async (req, res) => {
    try {
        const { id, nisn, cardID, nama } = req.body;
        const data = await prisma.siswa.update({
            where: {
                id: id,
            },
            data: {
                nisn: nisn,
                cardId: cardID,
                nama : nama,
            },
        });

        return resSuccess({
            res,
            title: "Berhasil mengubah data siswa",
            data: data,
        });
    } catch (error) {
        resError({
            res,
            errors: error,
            title: "Gagal mengubah data siswa",
            code: 400,
        });
    }
};

exports.delete = async (req, res) => {
    try {
        const { id } = req.body;
        const data = await prisma.siswa.delete({
            where: {
                id: id,
            },
        });
        return resSuccess({
            res,
            title: "Berhasil menghapus data siswa",
            data: data,
        });
    } catch (error) {
        resError({
            res,
            errors: error,
            title: "Gagal menghapus data siswa",
            code: 400,
        });
    }
};
