const BOOLEAN_THRESHOLD = 0.5;

export default {
    boolean(): boolean {
        return Math.random() >= BOOLEAN_THRESHOLD;
    }
};