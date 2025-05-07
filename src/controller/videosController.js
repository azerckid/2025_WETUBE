import Video from "../models/Video";

const videosController = {
    getVideos: async (req, res) => {
        try {
            const videos = await Video.find({}).sort({ createdAt: "desc" });
            res.render("videos/videos", { pageTitle: "Videos", videos });
        } catch (error) {
            res.status(400).render("404", { pageTitle: "Video Not Found" });
        }
    },
    getWatch: async (req, res) => {
        const { id } = req.params;
        try {
            const video = await Video.findById(id);
            res.render("videos/watch", { pageTitle: video.title, video });
        } catch (error) {
            res.status(400).render("404", { pageTitle: "Video Not Found" });
        }
    },
    getSearch: async (req, res) => {
        const { keyword } = req.query;
        if (!keyword) {
            return res.render("videos/search", { pageTitle: "Search", videos: [] });
        }
        const normalizedKeyword = keyword.normalize("NFC");
        try {
            const videos = await Video.find({
                $or: [
                    { title: { $regex: normalizedKeyword, $options: "i" } },
                    { description: { $regex: normalizedKeyword, $options: "i" } },
                    { hashtags: { $regex: normalizedKeyword, $options: "i" } },
                ],
            });
            return res.render("videos/search", { pageTitle: "Search", videos });
        } catch (error) {
            console.error(error);
            return res.status(400).render("404", { pageTitle: "Video Not Found" });
        }
    },
    getEdit: async (req, res) => {
        const { id } = req.params;
        try {
            const video = await Video.findById(id);
            res.render("videos/edit", { pageTitle: `Editing ${video.title}`, video });
        } catch (error) {
            res.status(404).render("404", { pageTitle: "Video Not Found" });
        }
    },
    postEdit: async (req, res) => {
        const { title, description, hashtags } = req.body;
        const { id } = req.params;
        const video = await Video.exists({ _id: id });
        if (!video) {
            return res.status(404).render("404", { pageTitle: "Video Not Found" });
        }
        try {
            await Video.findByIdAndUpdate(id, {
                title,
                description,
                hashtags: Video.formatHashtags(hashtags),
            });
            return res.redirect(`/videos/video/${id}`);
            // 이 경로는 절대 경로인가 상대 경로인가?
        } catch (error) {
            res.status(400).render("videos/edit", { pageTitle: "Editing Failed", errorMessage: error._message });
        }
    },
    getUpload: (req, res) => {
        res.render("videos/upload", { pageTitle: "Upload Video" });
    },
    postUpload: async (req, res) => {
        const { title, description, hashtags } = req.body;
        try {
            await Video.create({
                title,
                description,
                createdAt: Date.now(),
                hashtags,
                meta: {
                    views: 0,
                    rating: 0,
                },
            });
            res.redirect("/videos");
        } catch (error) {
            res.status(400).render("videos/upload", { pageTitle: "Upload Video", errorMessage: error._message });
        }
    },
    getDelete: (req, res) => {
        const { id } = req.params;
        res.render("videos/delete", { pageTitle: "Delete Video", id });
    },
    postDelete: async (req, res) => {
        const { id } = req.params;
        const video = await Video.exists({ _id: id });
        if (!video) {
            return res.status(404).render("404", { pageTitle: "Video Not Found" });
        }
        try {
            await Video.findByIdAndDelete(id);
            res.redirect("/videos");
        } catch (error) {
            res.status(400).render("404", { pageTitle: "Video Not Found" });
        }
    },
    postComments: (req, res) => {
        const { id } = req.params;
        res.send(`postComments ${id}`)
    },
    postCommentsDelete: (req, res) => {
        const { id } = req.params;
        res.send(`postCommentsDelete ${id}`)
    }
}

export default videosController;