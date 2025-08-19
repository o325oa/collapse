import './styles.css';
import { Collapse } from './widgets/Collapse';

const appRoot = document.getElementById('app');

const lorem = `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, voluptatum. Sed consequuntur, cumque explicabo at eaque iusto et nam tenetur vitae dignissimos perspiciatis animi non quia nobis dicta nesciunt maxime.`;

const widget = new Collapse({
  title: 'Collapse',
  content: lorem,
  initiallyOpen: false
});

appRoot.appendChild(widget.element);


