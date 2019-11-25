import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.page.html',
  styleUrls: ['./partners.page.scss'],
})
export class PartnersPage implements OnInit {

  partners = [
    {
      img: '../../../assets/logo/edm.png',
      title: 'Employée de maison',
      desc: '1ère plateforme gratuite de mise en relation entre employeur privé et employé(e) de maison.<br><br> Vous recherchez un ou ' +
          'une employé(e) de maison, déposez vos offres d\'emploi et recherchez un ou une employée de maison dans notre CVthéque',
      link: 'www.employee-de-maison.ch',
    },
    {
      img: '../../../assets/logo/pf.webp',
      title: 'Pôle Formation',
      desc: 'Vous souhaitez acquérir et/ou renforcer vos ' +
          'connaissances en tant qu\'employée de maison ou ' +
          'comme aide à domicile auprès des personnes âgées.<br><br>' +
          'Notre partenaire Pôle Formation propose des formations ' +
          'dans cs domaines',
      link: 'www.pole-formation.ch',
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
