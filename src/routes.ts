import { Router } from 'express'

const router = Router()

// simple route
router.get('/health-check', (req, res) => {
    res.json({ message: 'Success' });
});


export default router