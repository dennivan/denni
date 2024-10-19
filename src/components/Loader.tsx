import { motion, useSpring, useTransform } from 'framer-motion';
import React, { useRef } from 'react';

const Loader: React.FC = () => {
    const constraintsRef = useRef(null);
    const x = useSpring(0, { stiffness: 400, damping: 30 });
    const y = useSpring(0, { stiffness: 400, damping: 30 });

    const rotate = useTransform(x, [-200, 200], [-45, 45]);
    const scale = useTransform(y, [-200, 200], [0.8, 1.2]);

    const dotVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    };

    const dotTransition = {
        duration: 0.5,
        repeat: Infinity,
        repeatType: 'reverse' as const,
        ease: 'easeInOut',
    };

    return (
        <div
            className="flex h-screen items-center justify-center overflow-hidden bg-gray-100"
            ref={constraintsRef}
        >
            <motion.div
                className="flex cursor-grab flex-col items-center active:cursor-grabbing"
                drag
                dragConstraints={constraintsRef}
                dragElastic={0.1}
                style={{ x, y, rotate, scale }}
                whileDrag={{ cursor: 'grabbing' }}
            >
                <div className="h-48 w-48">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 100 100"
                        className="h-full w-full"
                    >
                        <motion.path
                            d="M 50 10 A 40 40 0 1 1 49.9999 10"
                            fill="none"
                            strokeWidth="8"
                            stroke="#3B82F6"
                            strokeLinecap="round"
                            animate={{
                                rotate: 360,
                                pathLength: [0.1, 0.8, 0.1],
                            }}
                            transition={{
                                rotate: {
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: 'linear',
                                },
                                pathLength: {
                                    duration: 1.5,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                },
                            }}
                        />
                    </svg>
                </div>
                <p className="mt-4 text-xl font-semibold text-gray-700">
                    Đợi xí, đang load
                    <motion.span
                        initial="hidden"
                        animate="visible"
                        variants={dotVariants}
                        transition={{ ...dotTransition, delay: 0 }}
                    >
                        .
                    </motion.span>
                    <motion.span
                        initial="hidden"
                        animate="visible"
                        variants={dotVariants}
                        transition={{ ...dotTransition, delay: 0.2 }}
                    >
                        .
                    </motion.span>
                    <motion.span
                        initial="hidden"
                        animate="visible"
                        variants={dotVariants}
                        transition={{ ...dotTransition, delay: 0.4 }}
                    >
                        .
                    </motion.span>
                </p>
            </motion.div>
        </div>
    );
};

export default Loader;
