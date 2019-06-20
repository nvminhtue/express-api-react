import React, {useState, useEffect} from 'react';
import moment from 'moment';
import ReactPaginate from 'react-paginate'
import styled from 'styled-components'

import { EditModal } from '../Form/ModalForm';

const Pagination = styled(ReactPaginate)`
	display: flex;
`;

export default (props) => {
	const {handleDelete, handleEdit, selectedArticle, isOpen, setOpen, articles, fetchArticles, countData } = props;
	const [pageCount, setPageCount] = useState(0);
	const [selectedPage, setSelectedPage] = useState(null);
	const [currentArticle, setCurrentArticle] = useState([]);

	const limitPage = 5;

	const handlePageClick = (data) => {
		const selected = data.selected;
		console.log(selected)
		setSelectedPage(selected);
	}

	useEffect(() => {
		setPageCount(countData/limitPage)
		const currentArticle = articles.slice(0, limitPage)
		setCurrentArticle(currentArticle)
	}, [articles])
	
	useEffect(() => {
		setPageCount(countData/limitPage)
		const offset = limitPage * selectedPage;
		const currentArticle = articles.slice(offset, offset + limitPage)
		setCurrentArticle(currentArticle)
		fetchArticles(selectedPage)
	}, [selectedPage])
	console.log(articles)
	return (
		<div>
			<div>
				{
				currentArticle && currentArticle.map((article, index) => {
				return(
					<div key={index} style={{ border: '2px solid brown', borderRadius: '4px', margin: '10px 0'}} >
						<div>{article.title}</div>
						<div style={{borderTop: '2px solid gray', background: 'white'}}>{article.body}</div>
						<div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', background: 'white'}} >
							<span>{article.author}</span>
							<span>{moment(new Date(article.updatedAt)).fromNow()}</span>
						</div>
						<div>
						<div onClick={() => handleEdit(article._id)}>EDIT</div>
						<div onClick={() => handleDelete(article)}>DELETE</div>
						</div>
					</div>
				)
				})
				}
				<EditModal {...{ isOpen, setOpen, selectedArticle }} />
			</div>
			<Pagination 
				previousLabel={'previous'}
				nextLabel={'next'}
				breakLabel={'...'}
				breakClassName={'break-me'}
				pageCount={pageCount}
				marginPagesDisplayed={2}
				pageRangeDisplayed={5}
				containerClassName={'pagination'}
				subContainerClassName={'pages pagination'}
				onPageChange={handlePageClick}
				activeClassName={'active'}
			/>
		</div>
)};