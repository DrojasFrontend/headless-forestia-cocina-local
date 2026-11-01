import classNames from 'classnames';
import './ContentWrapper.scss';
import {sanitize} from '../../utils/miscellaneous'

export default function ContentWrapper({ content, children, className }) {
  return (
    <article className={classNames('contenido-wp', className)}>
      <div dangerouslySetInnerHTML={{ __html: sanitize(content ?? '' )}} />
      {children}
    </article>
  );
}
