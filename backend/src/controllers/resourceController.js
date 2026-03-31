const resourcesData = require('../data/resourcesData');

exports.getResourcesByCareer = async (req, res) => {
    try {
        const { career } = req.params;
        console.log("Requested career:", career);

        const filteredResources = resourcesData.filter(r => r.career === career);

        if (!filteredResources || filteredResources.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No resources found for this career"
            });
        }

        res.status(200).json({
            success: true,
            data: filteredResources
        });
    } catch (error) {
        console.error('Error fetching resources:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};
