const AiIcon = ({ width, height }: {
    width?: number,
    height?: number
}) => {
    return (
        <svg
            data-testid="coachLargeDefault"
            width={width ? width : "48"}
            height={height ? height : "48"}
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M9.56124 37.1256C9.8922 36.7283 9.86365 36.1459 9.5148 35.7642C6.12844 32.0587 4 27.0006 4 22C4 16.6957 6.10714 11.6086 9.85786 7.85786C13.6086 4.10714 18.6957 2 24 2C27.3749 2 30.6949 2.93942 33.6508 4.73078C36.6068 6.52214 39.1026 9.10719 40.9058 12.2452C42.709 15.3832 43.761 18.9721 43.9638 22.6778C44.1667 26.3834 43.5137 30.0853 42.0658 33.4386C40.6179 36.792 38.4221 39.6877 35.6829 41.8563C32.9437 44.0248 29.7502 45.3956 26.3997 45.8411C25.6011 45.9472 24.7998 46 24 46C18.4828 46 12.3933 43.5817 9.03534 40.1926C8.38301 39.5342 8.41885 38.4972 9.01203 37.785L9.56124 37.1256Z"
                fill="url(#paint0_radial_256_1327_cds-react-aria8243319460-:r6j:-gradient)"
            />
            <circle cx="36" cy="22" r="10" fill="url(#paint1_linear_256_1327_cds-react-aria8243319460-:r6j:-gradient)" />
            <circle cx="12" cy="22" r="10" fill="url(#paint2_linear_256_1327_cds-react-aria8243319460-:r6j:-gradient)" />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 30C16.4183 30 20 26.4183 20 22C20 17.5817 16.4183 14 12 14C7.58172 14 4 17.5817 4 22C4 26.4183 7.58172 30 12 30ZM12 32C17.5228 32 22 27.5228 22 22C22 21 21.8532 20.0344 21.5801 19.1233C22.297 18.7259 23.1216 18.5 24 18.5C24.8784 18.5 25.703 18.7259 26.4199 19.1233C26.1468 20.0344 26 21 26 22C26 27.5228 30.4772 32 36 32C41.5228 32 46 27.5228 46 22C46 20.9548 45.8396 19.947 45.5422 19H46C46.5523 19 47 18.5523 47 18V17C47 16.4477 46.5523 16 46 16H44.0007C42.1763 13.5711 39.2716 12 36 12C32.1894 12 28.8766 14.1314 27.1887 17.2671C26.2323 16.7769 25.148 16.5 24 16.5C22.852 16.5 21.7677 16.7769 20.8113 17.2671C19.1234 14.1314 15.8106 12 12 12C8.72836 12 5.82368 13.5711 3.99927 16H2C1.44772 16 1 16.4477 1 17V18C1 18.5523 1.44772 19 2 19H2.4578C2.16035 19.947 2 20.9548 2 22C2 27.5228 6.47715 32 12 32ZM36 30C40.4183 30 44 26.4183 44 22C44 17.5817 40.4183 14 36 14C31.5817 14 28 17.5817 28 22C28 26.4183 31.5817 30 36 30Z"
                fill="black"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 23.5C16 24.8807 14.8807 26 13.5 26C12.1193 26 11 24.8807 11 23.5C11 22.1193 12.1193 21 13.5 21C14.8807 21 16 22.1193 16 23.5ZM37 23.5C37 24.8807 35.8807 26 34.5 26C33.1193 26 32 24.8807 32 23.5C32 22.1193 33.1193 21 34.5 21C35.8807 21 37 22.1193 37 23.5ZM20.7996 31.3995C20.4679 30.9579 19.8411 30.8687 19.3995 31.2004C18.9579 31.5321 18.8687 32.1589 19.2004 32.6005C20.2933 34.0556 22.0365 35 24 35C25.9635 35 27.7067 34.0556 28.7996 32.6005C29.1313 32.1589 29.0421 31.5321 28.6005 31.2004C28.1589 30.8687 27.5321 30.9579 27.2004 31.3995C26.469 32.3733 25.3078 33 24 33C22.6922 33 21.531 32.3733 20.7996 31.3995Z"
                fill="black"
            />
            <defs>
                <radialGradient
                    id="paint0_radial_256_1327_cds-react-aria8243319460-:r6j:-gradient"
                    cx="0"
                    cy="0"
                    r="1"
                    gradientUnits="userSpaceOnUse"
                    gradientTransform="translate(35 10) rotate(135) scale(45.2548 45.2548)"
                >
                    <stop stopColor="#76EBC8" />
                    <stop offset="0.333333" stopColor="#24DBE7" />
                    <stop offset="0.666667" stopColor="#66A5FF" />
                    <stop offset="1" stopColor="var(--cds-color-blue-600)" />
                </radialGradient>
                <linearGradient
                    id="paint1_linear_256_1327_cds-react-aria8243319460-:r6j:-gradient"
                    x1="36"
                    y1="12"
                    x2="36"
                    y2="32"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#CFE2FF" />
                    <stop offset="0.5" stopColor="white" />
                    <stop offset="1" stopColor="white" />
                </linearGradient>
                <linearGradient
                    id="paint2_linear_256_1327_cds-react-aria8243319460-:r6j:-gradient"
                    x1="12"
                    y1="12"
                    x2="12"
                    y2="32"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#CFE2FF" />
                    <stop offset="0.5" stopColor="white" />
                    <stop offset="1" stopColor="white" />
                </linearGradient>
            </defs>
        </svg>
    )
}

export default AiIcon