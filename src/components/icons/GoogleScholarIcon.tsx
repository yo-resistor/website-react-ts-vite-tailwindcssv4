const GoogleScholarIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width="100%"
      height="100%"
      className={`${className}`}
    >
      <path
        className="fill-neutral-700 dark:fill-neutral-400"
        d="M262 411.12L0 202.667 256 0z"
      />
      <path
        className="fill-neutral-850 dark:fill-neutral-450"
        d="M253 411.12l256-208.453L256 0z"
      />
      <circle
        className="fill-neutral-450 dark:fill-neutral-300"
        cx="256"
        cy="362.667"
        r="149.333"
      />
      <path
        className="fill-neutral-550 dark:fill-neutral-350"
        d="M121.037 298.667c23.968-50.453 75.392-85.334 134.963-85.334s110.995 34.881 134.963 85.334H121.037z"
      />
    </svg>
  );
};

export default GoogleScholarIcon;
