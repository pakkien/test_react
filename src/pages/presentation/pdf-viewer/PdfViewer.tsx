import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';
import '@cyntler/react-doc-viewer/dist/index.css';
import { useLocation } from 'react-router-dom';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';

const PdfViewer = () => {
	// const docs = [
	//     { uri: "https://url-to-my-pdf.pdf" }, // Remote file
	//     //{ uri: require("./example-files/pdf.pdf") }, // Local File
	//     ];

	const location = useLocation();

	return (
		// <DocViewer
		//   documents={docs}
		//   initialActiveDocument={docs[1]}
		//   pluginRenderers={DocViewerRenderers}
		// />

		<PageWrapper title='PDF Preview'>
			<Page>
				<DocViewer
					documents={location.state.files.map((file: any) => ({
						uri: file.uri,
						fileName: file.name,
					}))}
					pluginRenderers={DocViewerRenderers}
				/>
			</Page>
		</PageWrapper>
	);
};

export default PdfViewer;
