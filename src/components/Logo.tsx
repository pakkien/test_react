import React, { FC } from 'react';
import PropTypes from 'prop-types';

interface ILogoProps {
	width?: number;
	height?: number;
}
const Logo: FC<ILogoProps> = ({ width, height }) => {
	return (
<svg xmlns="http://www.w3.org/2000/svg" 
	version='1.1'
			width={height !== 854 && !!height ? height * (2155 / 854) : width}
			height={width !== 2155 && !!width ? width * (854 / 2155) : height}
			viewBox='0 0 2155 854'
			fill='none'
>
  <image width="2155" height="854" xlinkHref="data:image/png;base64,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P53j+kzO/fGvfFQceB/XnwO3ZAEAsElvmUkWAACb9JaZZAEAsElvmUkWAACb9JaZZAEAsElvmUkWAACb9JaZZAEAsElvmUkWAACb9JaZZAEAsElvmUkWAACb9JaZZAEAsElvmUkWAACb9JaZZAEAsElvmUkWAACb9JaZZAEAsElvmUkWAACb9JaZZAEAsElvmUkWAACb9JaZZAEAsElvmUkWAACb9JaZZAEAsElvmUkWAACb9JaZZAEAsElvmUkWAACb9JaZZAEAsElvmUkWAACb9JaZZAEAsElvmUkWAACb9JaZZAEAsElvmUkWAACb9JaZZAEAsElvmUkWAACb9JaZZAEAsElvmUkWAACb9JaZZAEAsElvmUkWAACb9JaZZAEAsElvmUkWAACb9JaZZAEAsElvmUkWAACb9JaZZAEAsElvmUkWAACb9JaZZAEAsElvmUkWAACb9JaZZAEAsElvmUkWAACb9JaZZAEAsElvmUkWAACb9JaZZAEAsElvmUkWAACb9JaZZAEAsElvmUkWAACb9JaZZAEAsElvmUkWAACb9JaZZAEAsElvmUkWAACb9JaZZAEAsElvmUkWAACb9JaZZAEAsElvmUkWAACb9JaZZAEAsElvmUkWAACb9JaZZAEAsElvmUkWAACb9JaZZAEAsElvmUkWAACb9JaZZAEAsElvmUkWAACb9JaZZAEAsElvmUkWAACb9JaZZAEAsElvmUkWAACb9JaZZAEAsElvmUkWAACb9JaZZAEAsElvmUkWAACb9JaZZAEAsElvmUkWAACb9JaZZAEAsElvmUkWAACb9JaZZAEAsElvmUkWAACb9JaZZAEAsElvmUkWAACb9JaZZAEAsElvmUkWAACb9JaZZAEAsElvmUkWAACb9JaZZAEAsElvmUkWAACb9JaZZAEAsElvmUkWAACb9JaZZAEAsElvmUkWAACb9JaZZAEAsElvmUkWAACb9JaZZAEAsElvmUkWAACb9JaZ/FchIiIisjkPSxEREZGteViKiIiIbM3DUkRERGRrHpYiIiIiC/OvL/8GZBP02RvlEygAAAAOZVhJZk1NACoAAAAIAAAAAAAAANJTkwAAAABJRU5ErkJggg=="/>
</svg>

		// <svg
		// 	version='1.1'
		// 	xmlns='http://www.w3.org/2000/svg'
		// 	width={height !== 854 && !!height ? height * (2155 / 854) : width}
		// 	height={width !== 2155 && !!width ? width * (854 / 2155) : height}
		// 	viewBox='0 0 2155 854'
		// 	fill='none'
		// 	>
		// 	<path
		// 		d='M0 0 C187.11 0 374.22 0 567 0 C567 75.9 567 151.8 567 230 C379.89 230 192.78 230 0 230 C0 154.1 0 78.2 0 0 Z '
		// 		fill='#FEFEFE'
		// 		transform='translate(0,0)'
		// 	/>
		// 	<path
		// 		d='M0 0 C187.11 0 374.22 0 567 0 C567 75.9 567 151.8 567 230 C379.89 230 192.78 230 0 230 C0 154.1 0 78.2 0 0 Z M4 4 C4 76.93 4 149.86 4 225 C188.47 225 372.94 225 563 225 C563 152.07 563 79.14 563 4 C378.53 4 194.06 4 4 4 Z '
		// 		fill='#000000'
		// 		transform='translate(0,0)'
		// 	/>
		// 	<path
		// 		d='M0 0 C1.98828125 0.6875 1.98828125 0.6875 3.98828125 3.6875 C4.65820288 7.91735401 4.67158601 11.5201877 2.48828125 15.25 C-1.04647635 17.28248562 -4.03512578 17.61645819 -8.01171875 16.6875 C-11.26157797 14.00636615 -11.90746889 12.33616582 -12.57421875 8.1875 C-12.01171875 4.6875 -12.01171875 4.6875 -10.07421875 1.6875 C-6.28495582 -0.78712069 -4.34890449 -0.58472665 0 0 Z '
		// 		fill='#111111'
		// 		transform='translate(275.01171875,110.3125)'
		// 	/>
		// 	<path
		// 		d='M0 0 C3.2998703 2.722393 3.91673192 4.32195991 4.4375 8.5625 C3.76852419 13.81873852 3.76852419 13.81873852 1 16 C-3.20553882 17.22661549 -6.63530074 17.73227765 -10.5625 15.625 C-12.68488221 11.74934553 -12.76063934 8.31821293 -12 4 C-9.25758428 -0.68496019 -5.01405529 -1.17131619 0 0 Z '
		// 		fill='#0F0F0F'
		// 		transform='translate(311,110)'
		// 	/>
		// 	<path
		// 		d='M0 0 C0.66 0.66 1.32 1.32 2 2 C1.67 2.99 1.34 3.98 1 5 C-0.11375 4.79375 -1.2275 4.5875 -2.375 4.375 C-3.57125 4.25125 -4.7675 4.1275 -6 4 C-6.66 4.66 -7.32 5.32 -8 6 C-7.67673447 9.59679066 -7.67673447 9.59679066 -7 13 C-5.35 13.33 -3.7 13.66 -2 14 C-2 12.68 -2 11.36 -2 10 C-2.99 10 -3.98 10 -5 10 C-5 9.01 -5 8.02 -5 7 C-2.69 7 -0.38 7 2 7 C2 9.97 2 12.94 2 16 C-1.59264452 17.19754817 -4.22717474 17.33094958 -8 17 C-10.4375 15.5625 -10.4375 15.5625 -12 13 C-12.60864093 9.87066691 -12.65356111 7.12448075 -12 4 C-8.54217705 -0.29608306 -5.33485606 -0.60394597 0 0 Z '
		// 		fill='#0D0D0D'
		// 		transform='translate(294,110)'
		// 	/>
		// 	<path
		// 		d='M0 0 C2.5 0.25 2.5 0.25 4.5 2.25 C4.75 5.75 4.75 5.75 4.5 9.25 C2.5 11.25 2.5 11.25 0 11.5 C-2.5 11.25 -2.5 11.25 -4.5 9.25 C-4.75 5.75 -4.75 5.75 -4.5 2.25 C-2.5 0.25 -2.5 0.25 0 0 Z '
		// 		fill='#EEEEEE'
		// 		transform='translate(306.5,112.75)'
		// 	/>
		// 	<path
		// 		d='M0 0 C2.5 0.25 2.5 0.25 4.5 2.25 C4.75 5.75 4.75 5.75 4.5 9.25 C2.5 11.25 2.5 11.25 0 11.5 C-2.5 11.25 -2.5 11.25 -4.5 9.25 C-4.75 5.75 -4.75 5.75 -4.5 2.25 C-2.5 0.25 -2.5 0.25 0 0 Z '
		// 		fill='#EFEFEF'
		// 		transform='translate(271.5,112.75)'
		// 	/>
		// 	<path
		// 		d='M0 0 C1.32 0 2.64 0 4 0 C4 4.62 4 9.24 4 14 C5.98 14 7.96 14 10 14 C10 14.99 10 15.98 10 17 C6.7 17 3.4 17 0 17 C0 11.39 0 5.78 0 0 Z '
		// 		fill='#131313'
		// 		transform='translate(253,110)'
		// 	/>
		// </svg>

		// <svg
		// 	width={height !== 854 && !!height ? height * (2155 / 854) : width}
		// 	height={width !== 2155 && !!width ? width * (854 / 2155) : height}
		// 	viewBox='0 0 2155 854'
		// 	fill='none'
		// 	xmlns='http://www.w3.org/2000/svg'>
		// 	<path
		// 		d='M985.058 284.2C953.411 284.2 937.587 301.4 937.587 335.8V355H1025.92V415H939.991V673H864.879V415H812V355H864.879V334.6C864.879 300.2 874.894 273.2 894.924 253.6C914.953 233.6 943.195 223.6 979.65 223.6C1008.49 223.6 1031.13 229.4 1047.55 241L1026.52 297.4C1013.7 288.6 999.88 284.2 985.058 284.2Z'
		// 		fill='currentColor'
		// 	/>
		// 	<path
		// 		d='M1193.19 349C1240.46 349 1276.52 360.4 1301.35 383.2C1326.59 405.6 1339.21 439.6 1339.21 485.2V673H1268.3V634C1259.09 648 1245.87 658.8 1228.65 666.4C1211.82 673.6 1191.39 677.2 1167.35 677.2C1143.32 677.2 1122.29 673.2 1104.26 665.2C1086.23 656.8 1072.21 645.4 1062.2 631C1052.58 616.2 1047.78 599.6 1047.78 581.2C1047.78 552.4 1058.39 529.4 1079.62 512.2C1101.26 494.6 1135.11 485.8 1181.18 485.8H1264.1V481C1264.1 458.6 1257.29 441.4 1243.67 429.4C1230.45 417.4 1210.62 411.4 1184.18 411.4C1166.15 411.4 1148.33 414.2 1130.7 419.8C1113.47 425.4 1098.85 433.2 1086.83 443.2L1057.39 388.6C1074.22 375.8 1094.45 366 1118.08 359.2C1141.72 352.4 1166.75 349 1193.19 349ZM1182.98 622.6C1201.81 622.6 1218.43 618.4 1232.85 610C1247.67 601.2 1258.09 588.8 1264.1 572.8V535.6H1186.58C1143.32 535.6 1121.69 549.8 1121.69 578.2C1121.69 591.8 1127.09 602.6 1137.91 610.6C1148.73 618.6 1163.75 622.6 1182.98 622.6Z'
		// 		fill='currentColor'
		// 	/>
		// 	<path
		// 		d='M1585.76 677.2C1552.51 677.2 1522.67 670.2 1496.23 656.2C1469.79 642.2 1449.16 622.8 1434.34 598C1419.51 572.8 1412.1 544.4 1412.1 512.8C1412.1 481.2 1419.51 453 1434.34 428.2C1449.16 403.4 1469.59 384 1495.63 370C1522.07 356 1552.11 349 1585.76 349C1617.41 349 1645.05 355.4 1668.68 368.2C1692.72 381 1710.75 399.4 1722.76 423.4L1665.08 457C1655.87 442.2 1644.25 431.2 1630.23 424C1616.61 416.4 1601.58 412.6 1585.16 412.6C1557.12 412.6 1533.88 421.8 1515.46 440.2C1497.03 458.2 1487.81 482.4 1487.81 512.8C1487.81 543.2 1496.83 567.6 1514.86 586C1533.28 604 1556.72 613 1585.16 613C1601.58 613 1616.61 609.4 1630.23 602.2C1644.25 594.6 1655.87 583.4 1665.08 568.6L1722.76 602.2C1710.35 626.2 1692.12 644.8 1668.08 658C1644.45 670.8 1617.01 677.2 1585.76 677.2Z'
		// 		fill='currentColor'
		// 	/>
		// 	<path
		// 		d='M1787.69 352.6H1862.81V673H1787.69V352.6ZM1825.55 299.8C1811.93 299.8 1800.51 295.6 1791.3 287.2C1782.09 278.4 1777.48 267.6 1777.48 254.8C1777.48 242 1782.09 231.4 1791.3 223C1800.51 214.2 1811.93 209.8 1825.55 209.8C1839.17 209.8 1850.59 214 1859.8 222.4C1869.02 230.4 1873.62 240.6 1873.62 253C1873.62 266.2 1869.02 277.4 1859.8 286.6C1850.99 295.4 1839.57 299.8 1825.55 299.8Z'
		// 		fill='currentColor'
		// 	/>
		// 	<path
		// 		d='M2154.28 655.6C2145.47 662.8 2134.65 668.2 2121.83 671.8C2109.41 675.4 2096.19 677.2 2082.17 677.2C2046.92 677.2 2019.68 668 2000.45 649.6C1981.22 631.2 1971.61 604.4 1971.61 569.2V415H1918.73V355H1971.61V281.8H2046.72V355H2132.65V415H2046.72V567.4C2046.72 583 2050.52 595 2058.13 603.4C2065.75 611.4 2076.76 615.4 2091.18 615.4C2108.01 615.4 2122.03 611 2133.25 602.2L2154.28 655.6Z'
		// 		fill='currentColor'
		// 	/>
		// 	<path
		// 		d='M1824.4 200L1879.83 230.098V290.295L1824.4 320.393L1768.97 290.295V230.098L1824.4 200Z'
		// 		fill='#F35421'
		// 	/>
		// 	<rect x='300' width='256' height='256' rx='64' fill='#46BCAA' />
		// 	<circle cx='128' cy='726' r='128' fill='#4D69FA' />
		// 	<rect x='300' y='355' width='256' height='144' fill='#6C5DD3' />
		// 	<path d='M128 24L238.851 216H17.1488L128 24Z' fill='#FFCF52' />
		// 	<path
		// 		d='M128 307L238.851 367.197V487.59L128 547.787L17.1488 487.59V367.197L128 307Z'
		// 		fill='#F35421'
		// 	/>
		// </svg>
	);
};
Logo.propTypes = {
	width: PropTypes.number,
	height: PropTypes.number,
};
Logo.defaultProps = {
	width: 2155,
	height: 854,
};

export default Logo;
